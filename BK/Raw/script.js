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
      const { name, street, brewery_type, city, state } = entry;
      box.classList.add("box-container");
      box.innerHTML = `
    <div class="box-header">
        <h2>${name}</h1>
        <h3>Type: ${brewery_type}</h3>
        <h3>Street: ${street}</h3>
        <h3>Place: ${city}, ${state}</h3>
    <div class="box-header">
    <div class="btn-icons">
    </div>
    `;
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
