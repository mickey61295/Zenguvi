var full_div = document.createElement("div");
full_div.classList.add("full-div");
full_div.classList.add("container-fluid");
document.body.appendChild(full_div);
full_div.innerHTML+=`<h1 id="title">DOM Manipulation of FORMS</h1>
<p id="description">This is a task of creating and manipulating forms with DOM</p>`
const yolo=['First name', 'Last name', 'Address', 'Pincode', 'Gender', 'Favorite food', 'State', 'Country'];
var table = document.createElement("table");
table.classList.add("table")
table.classList.add("table-dark")
const thead = document.createElement("thead");
var tr = document.createElement("tr");
for (var i = 0; i < yolo.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = yolo[i];
    tr.appendChild(th);
}
thead.appendChild(tr);
table.appendChild(thead);
const tbody = document.createElement("tbody");
table.appendChild(tbody);
full_div.appendChild(table);

var open_button = document.createElement("button");
open_button.innerHTML = "Open Form";
open_button.classList.add("btn-open-form")
open_button.classList.add("btn")
open_button.classList.add("btn-primary")
open_button.classList.add("btn-md")
full_div.appendChild(open_button);

var close_button = document.createElement("button");
close_button.innerHTML = "Close Form";
close_button.classList.add("btn-close-form")
close_button.classList.add("btn")
close_button.classList.add("btn-danger")
close_button.classList.add("btn-md")
full_div.appendChild(close_button);


document.getElementsByClassName("btn-open-form")[0].addEventListener("click", function () {
    document.getElementsByClassName("form-container")[0].style.display = "block";
    document.getElementsByClassName("btn-close-form")[0].style.display = "block";
    document.getElementsByClassName("btn-open-form")[0].style.display = "none";
});

document.getElementsByClassName("btn-close-form")[0].addEventListener("click", function () {
    document.getElementsByClassName('form-container')[0].reset();
    document.getElementsByClassName("form-container")[0].style.display = "none";
    document.getElementsByClassName("btn-close-form")[0].style.display = "none";
    document.getElementsByClassName("btn-open-form")[0].style.display = "block";
});

var form = document.createElement("div");
form.classList.add("form-popup");
form.setAttribute("id", "myForm");

form.innerHTML = 
`<form action="javascript:formData()" id="form" class="form-container" novalidate>
  <div class="form-group">  
  <h1>Data</h1>
    <input type="text" placeholder="Enter First Name" id="first-name" name="fname" required>
    <input type="text" placeholder="Enter Last Name" id="last-name" name="lname" required>
    <textarea id="address" name="address" placeholder="Enter Address" required></textarea>
    <input type="text" id="pincode" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="6" placeholder="Enter Pincode" name="pincode" required>
    <div style="display: none;">
    <input type="radio" name="male">
    <input type="radio" name="female">
    </div>
    <select name="gender_selector" id="gender">
        <option value="" disabled selected>Select your Gender</option>
        <option value = "Male">Male</option>
        <option value = "Female">Female</option>
        <option value = "Prefer Not to Say">Prefer Not to Say</option>
    </select>
    <button type="button" class="btn btn-light food-selector">Select your fav foods</button>
    <div class="custom-selector"></div>
    <input type="text" placeholder="Enter State" name="state">
    <input type="text" placeholder="Enter Country" name="country">
    <button type="submit" id="submit" class="btn btn-add-data btn-primary">Add Data</button>
    </div>
</form>`
full_div.appendChild(form);


var foodList = ['Pizza', 'Chicken', 'Burger', 'Mac n Cheese']
const customSelect = document.getElementsByClassName("custom-selector")[0];

for (i in foodList) {
    var option = `<input type="checkbox" class="checkbox" name="food" value="${foodList[i]}">${foodList[i]}<br>`
    customSelect.innerHTML += option;
}

const foodSelector = document.getElementsByClassName("food-selector")[0];
foodSelector.addEventListener("click", function () {
    if (customSelect.style.display == "none") {
        customSelect.style.display = "block";
    } else {
        customSelect.style.display = "none";
    }
});


function formData() {
    var checked = document.getElementsByClassName("checkbox")
    var favfood = [];
    var fname = document.getElementsByName("fname")[0].value;
    var lname = document.getElementsByName("lname")[0].value;
    var address = document.getElementsByName("address")[0].value;
    var pincode = document.getElementsByName("pincode")[0].value;
    var gender =  document.getElementById("gender").value;
    var state =document.getElementsByName("state")[0].value;
    var country = document.getElementsByName("country")[0].value;
    for (let i of checked) {
        if (i.checked) {
            favfood.push(i.value);
        }
    }
    if (favfood.length < 2){
        alert("Please select atleast 2 food items");
    }
    else if (fname == "" || lname == "" || address == "" || pincode == "" || gender == "" || state == "" || country == "")
    {
        alert("Please enter all required data");
    }
    else {
        document.getElementsByClassName("btn-close-form")[0].style.display = "none";
        document.getElementsByClassName("btn-open-form")[0].style.display = "block";
        var food = favfood.join()
        document.getElementsByClassName("form-container")[0].style.display = "none";
        document.getElementsByClassName('form-container')[0].reset();

        // Add the data in above variables to the table in html
        var tr = document.createElement("tr");
        tr.setAttribute("scope", "row");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td")
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");
        var td8 = document.createElement("td");

        td1.innerHTML = fname;
        td2.innerHTML = lname;
        td3.innerHTML = address;
        td4.innerHTML = pincode;
        td5.innerHTML = gender;
        td6.innerHTML = food;
        td7.innerHTML = state;
        td8.innerHTML = country;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);

        
        tbody.appendChild(tr);}
        
}
