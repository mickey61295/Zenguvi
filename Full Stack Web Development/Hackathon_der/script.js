const URL = "https://api.openbrewerydb.org/breweries";
let page = 1; // Default page index to be shown
var xoxo = 10;

class FetchApi {
    constructor() {
        this.pages = {}; // Pagination of incoming array objects
    }

    /* Fetching the API data using Asyn/Await Fetch  Parameters- API URL - required*/
    fetchDrinks = async(url) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const data = await response.json();

            //Paginate the JSON array
            this.pagination(data);

            return this.pages;
        } catch (error) {
            console.log("Error", error);
        }
    };

    /* Creats pages of 10 records per page  Parameter - API Array Objects - required */
    pagination = (data) => {
        let tempArr = [];
        for (let i = 0, count = 1; i < data.length; i++) {
            tempArr.push(data[i]);

            if (i % xoxo  === xoxo-1) {
                this.pages[count] = tempArr;
                count++;
                tempArr = [];
            }
        }
    };
    searchDrinkByType = async(type) => {
        try {
            const [res1, res2, res3] = await Promise.all([
                fetch(`https://api.openbrewerydb.org/breweries?by_type=${type}`).then(
                    (data) => data.json()
                ),
                fetch(`https://api.openbrewerydb.org/breweries?by_state=${type}`).then(
                    (data) => data.json()
                ),
                fetch(`https://api.openbrewerydb.org/breweries?by_name=${type}`).then(
                    (data) => data.json()
                ),
            ]);

            if ([...res1, ...res2, ...res3].length === 0) {
                throw new Error("Something went wrong!");
            }
            //Paginate the JSON array
            this.pagination([...res1, ...res2, ...res3]);

            return this.pages;
        } catch (error) {
            console.log("Error", error);
            return { error: error };
        }
    };
}

class UI {
    constructor() {
        this.btnsCntr = document.querySelector(".button-container");
    }

    /* Creating Elements using DOM dynamically 
                                       Parameters
                                        1. HTML Elements - required
                                        2. Class Names - Optional*/

    createElements(el, classNames) {
        const element = document.createElement(el);
        //Checking if the class Name is present
        if (classNames) element.classList.add(...classNames);
        return element;
    }

    getElement(el) {
        const element = document.querySelector(el);
        return element;
    }

    displayError(msg, breweries, btnsCntr) {
            breweries.innerHTML = "";
            btnsCntr.innerHTML = "";

            breweries.innerHTML = msg;
        }
        /* Displaying the Cards element in the Page using DOM dynamically in the breweries SECTION
                                                  1. API Objects Array - required*/

    displayDrinks(drinks, breweriesSection) {
        //Clearing the breweries section
        breweriesSection.innerHTML = "";

        drinks.forEach((drink) => {
            breweriesSection.append(this.generateCard(drink));
        });
    }

    displayButtons(pages, buttonsCntr, activeIndex) {
        // Clearing the existing buttons
        buttonsCntr.innerHTML = ``;
        pages.forEach((index) => {
            buttonsCntr.append(this.generateButtons(+index, activeIndex));
        });
    }

    /* Creating the Card ARTICLE element using DOM dynamically  and returning with API data loaded.
                              1. API Object - required*/
    generateCard(obj) {
        const article = this.createElements("article", ["card"]);
        article.innerHTML += `<div class="drink-detais"><h2 class="drink-title">${obj.name}</h2>
                      <h3 class="drink-type"><span class="drink-span">Type:</span> ${obj.brewery_type}</h3>
                      <p class="drink-street"><span class="drink-span">Street:</span> ${obj.street}</p>
                      <p class="drink-city"><span class="drink-span">Place:</span> ${obj.city}, ${obj.state}</p>
                      <p class="drink-contact" id="contact-${obj.id}"></p>
                      </div>
                      <div class="contacts">
                      <button class="btn icon phone" data-id="${obj.id}"><i class="fas fa-phone"></i></button>
                      <button class="btn icon website" data-id="${obj.id}""><i class="fas fa-link"></i></button>
                      </div>
                      </article>`;
        return article;
    }

    generateButtons(index, activeIndex) {
        const activeClass = index === activeIndex ? "active-btn" : null;
        const btn = this.createElements("button", ["btn", "page-btn", activeClass]);
        btn.id = `btn-${index}`;
        btn.type = "button";
        btn.innerHTML = index;
        btn.dataset.id = index;
        return btn;
    }
}

// Initializing the Fetch and UI classes
const drinks = new FetchApi();

const ui = new UI();

/* Getting the Elements using querySelector dynamically 
   The argument must be '.' apended
   Parameters
   1. HTML Elements - required
*/
const getElements = (el) => {
    const element = document.querySelectorAll(el);
    return element;
};

const getElement = (el) => {
    const element = document.querySelector(el);
    return element;
};

/* Creating Elements using DOM dynamically 
   Parameters
   1. HTML Elements - required
   2. Class Names - Optional
*/
const createElements = (el, classNames) => {
    const element = document.createElement(el);

    //Checking if the class Name is present
    if (classNames) element.classList.add(...classNames);
    return element;
};

/* Handling the click EVENTS of phone and Website buttons in the Cards 
   to display Phone no and URL
   
   Parameters
   1. EVENT - required
*/
const handleClick = (e) => {
    console.log(e.currentTarget, drinks.pages[page]);

    const classes = e.currentTarget.classList;

    const drinkId = +e.currentTarget.dataset.id;
    const contact = getElement(`#contact-${drinkId}`);
    // Search the id in the pages and get the Phone number or Site URL
    let targetObj = drinks.pages[page].find((el) => el.id === drinkId);

    if (classes.contains("phone")) {
        contact.innerHTML = `<span class="drink-span">Phone:</span> ${targetObj.phone}`;
    } else {
        contact.innerHTML = `<span class="drink-span">Website URL:</span> ${targetObj.website_url}`;
    }
};

const showLoading = () => {
    const breweriesSection = getElement(".breweries");
    const loading = createElements("h2", ["loading"]);
    loading.innerHTML = "Please wait while the page is loading...!";

    breweriesSection.innerHTML = "";
    breweriesSection.append(loading);
};

/* Setting the click EVENTS of all the buttons in the page 
   
   Parameters - NONE
*/
const settingListeners = () => {
    const phoneIcon = getElements(".phone");

    phoneIcon.forEach((icon) => {
        icon.addEventListener("click", handleClick);
    });

    const websiteIcon = getElements(".website");

    websiteIcon.forEach((icon) => {
        icon.addEventListener("click", handleClick);
    });

    // Pagination listeners
    const prevBtn = getElement(".prev-btn");
    const nextBtn = getElement(".next-btn");

    //Even listener for prev and next button
    prevBtn.addEventListener("click", handlePageBtns);
    nextBtn.addEventListener("click", handlePageBtns);

    const pageBtns = getElements(".page-btn");

    // Event Listeners for the Button clicks
    pageBtns.forEach((btn) => {
        btn.addEventListener("click", handlePageBtns);
    });
};

const settingInitialPage = () => {
    const bodyEl = document.body;

    //Creating the HEADER element
    const header = createElements("header", ["title"]);
    header.innerHTML = `<h1>Open Brewery API</h1>`;

    bodyEl.prepend(header);

    // Creating SECTION - breweries and append ater HEADER element
    const breweries = createElements("section", ["breweries"]);

    header.after(breweries);

    const form = createElements("form", ["drinks-form"]);
    form.innerHTML = `<input type="text" id="drink-input" name="drink-input" placeholder="Search by name, state,type">`;

    breweries.before(form);

    const buttonContainer = createElements("section", ["button-container"]);

    buttonContainer.innerHTML = `<button type="button" class="btn prev-btn">Prev</button>
                                 <div class="page-btns-container"></div>
                                 <button type="button" class="btn next-btn">Next</button>`;
    
    // add dropdown menu to buttonContainer with [5,10,15,20] as options
    const dropdown = createElements("select", ["dropdown"]);
    dropdown.innerHTML = `<option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>`;
                            
    buttonContainer.append(dropdown);
    dropdown.onchange = function() {
        xoxo = dropdown.value;
    }

    breweries.after(buttonContainer);
};

const handleInput = async(e) => {
    e.preventDefault();

    const breweries = getElement(".breweries");
    const btnsCntr = getElement(".button-container");
    const buttonsCnt = getElement(".page-btns-container");

    const inputValue = e.currentTarget.value;
    if (!inputValue) return; // Handling INPUT when no value
    const pages = await drinks.searchDrinkByType(inputValue);

    console.log(pages.error);
    if (pages.error) {
        ui.displayError("No rows to display", breweries, btnsCntr);
    } else {
        // Displaying the API contents in the Webpage
        ui.displayDrinks(pages[page], breweries);

        // Displaying Pagination buttons
        ui.displayButtons(Object.keys(pages), buttonsCnt, page);

        //Setting Event listeners for all the buttons
        settingListeners();
    }
};
// Initializing the Page with list of Breweries
const init = async() => {
    // Setting initial page loading message
    settingInitialPage();
    showLoading();

    const breweries = getElement(".breweries");
    const buttonsCnt = getElement(".page-btns-container");

    // Fetching the drinks from API
    const pages = await drinks.fetchDrinks(URL);

    // Displaying the API contents in the Webpage
    ui.displayDrinks(pages[page], breweries);

    // Displaying Pagination buttons
    ui.displayButtons(Object.keys(pages), buttonsCnt, page);

    //Setting Event listeners for all the buttons
    settingListeners();

    // Input form EVENT Listener
    const inputEl = getElement(`input[name="drink-input"]`);

    inputEl.addEventListener("keyup", handleInput);
};

// Initializing the Webpage
init();

/* Handling the Pagination buttons */
const handlePageBtns = (e) => {
    const btnValue = e.target.innerHTML;

    const breweries = getElement(".breweries");

    const totalLength = Object.keys(drinks.pages).length;

    if (btnValue === "Prev") {
        if (page === 1) {
            page = totalLength;
        } else {
            page--;
        }
    } else if (btnValue === "Next") {
        if (page === totalLength) {
            page = 1;
        } else {
            page++;
        }
    } else {
        page = +btnValue;
    }

    //Toggling the active button
    const activeBtn = getElement(".active-btn");
    activeBtn.classList.remove("active-btn");

    const newActiveBtn = getElement(`#btn-${page}`);
    newActiveBtn.classList.add("active-btn");

    ui.displayDrinks(drinks.pages[page], breweries);

    //Setting Event listeners for all the buttons
    settingListeners();
};