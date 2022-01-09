let entries;
let err;

const getEntries = async () => {
  try {
    entries = await (
      await fetch("https://api.openbrewerydb.org/breweries")
    ).json();
  } catch (e) {
    err = e && e.message;
  }
};

const boxSelector = document.querySelector(".box");
const loadingSel = document.querySelector(".loading");
getEntries()
  .then(() => {
    loadingSel.style.display = "none";
    entries.forEach((entry) => {
      const box = document.createElement("div");
      const { name, street, brewery_type, city, state, website_url, phone} = entry;
      box.classList.add("box-container");
      box.innerHTML = `
    <div class="box-header">
        <h2>${name}</h1>
        <h3>Type: ${brewery_type}</h3>
        <h3>Street: ${street}</h3>
        <h3>Place: ${city}, ${state}</h3>
      </div>
    <div class="box-header">
    <div class="btn-icons">
    `

    if (website_url) {
    box.innerHTML+=`<a href=${website_url}><img src="https://cdn-icons-png.flaticon.com/512/25/25284.png" alt=${website_url} id="imgcontainer"></img></a>`
    }
    if (phone) {
    box.innerHTML += `<a href="tel:${phone}"><img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/phone-512.png" alt=${phone} id="imgcontainer"></img></a>
    </div>
    `;
    }
      boxSelector.appendChild(box);
    });
  })
  .catch((e) => {
    loadingSel.style.display = "none";
    const box = document.createElement("div");
    box.classList.add("error");
    box.innerHTML = `<div>Something went wrong: ${e.message}. Please try later </div>`;
    boxSelector.appendChild(box);
  });

const search = document.querySelector(".search");
search.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const boxes = document.querySelectorAll(".box-container");
  boxes.forEach((box) => {
    let name = box.querySelector("h2")
    let street = box.querySelector("h3:nth-child(2)")
    let brewery_type = box.querySelector("h3:nth-child(3)")
    let city = box.querySelector("h3:nth-child(4)")
    let state = box.querySelector("h3:nth-child(5)")

    if (name == null) {
      name = "#";
    } else {
      name = name.innerText.toLowerCase();
    }

    if (street == null) {
      street = "#";
    } else {
      street = street.innerText.toLowerCase();
    }

    if (brewery_type == null) {
      brewery_type = "#";
    } else {
      brewery_type = brewery_type.innerText.toLowerCase();
    }

    if (city == null) {
      city = "#";
    } else {
      city = city.innerText.toLowerCase();
    }

    if (state == null) {
      state = "#";
    } else {
      state = state.innerText.toLowerCase();
    }
        
    if (
      name.toLowerCase().includes(searchValue) ||
      street.toLowerCase().includes(searchValue) ||
      brewery_type.toLowerCase().includes(searchValue) ||
      city.toLowerCase().includes(searchValue) ||
      state.toLowerCase().includes(searchValue)
    ) {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  });
});
