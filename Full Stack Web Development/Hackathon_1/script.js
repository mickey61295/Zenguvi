// All your HTML elements should be created with DOM.

// Use the async/await.

// Use try catch to handle errors.

// Use fetch() to get the data from Open Brewery Api

//Create all required HTML first



//Create the function to fetch the data with promise
function fetchData() {
    return new Promise((resolve, reject) => {
        fetch('https://api.openbrewerydb.org/breweries')
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

//Create the function to display the data
function displayData(data) {
    const container = document.querySelector('.container');
    data.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <div class="card-image">
            <img src="${element.image_url}" alt="${element.name}">
        </div>
        <div class="card-content">
            <h3>${element.name}</h3>
            <p>${element.street}</p>
            <p>${element.city}, ${element.state} ${element.postal_code}</p>
        </div>
        `;
        container.appendChild(div);
    });
}


//Create the function to display the error
function displayError() {
    const container = document.querySelector('.container');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="card-content">
        <p>Something went wrong!</p>
    </div>
    `;
    container.appendChild(div);
}

//Create the function to display the loading
function displayLoading() {
    const container = document.querySelector('.container');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="card-content">
        <p>Loading...</p>
    </div>
    `;
    container.appendChild(div);
}

//Create the function to clear the loading
function clearLoading() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
}

//Create the function to clear the error
function clearError() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
}

//Create the function to clear the data
function clearData() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
}


//Create the function to call the functions
function callFunctions() {
    displayLoading();
    fetchData().then(data => {
        clearLoading();
        displayData(data);
    }).catch(error => {
        clearLoading();
        displayError();
    });
}

