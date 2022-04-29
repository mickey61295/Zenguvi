function boilerplate(){
    const body = document.body;

    const outerDiv = document.createElement('div');
    outerDiv.classList.add('container-fluid');
    body.appendChild(outerDiv);

    const boxContainer = document.createElement('div');
    boxContainer.classList.add('boxContainer');
    body.appendChild(boxContainer);

    const title = document.createElement('h1');
    title.classList.add('text-center');
    title.innerHTML = 'Free to Play Games Database';
    outerDiv.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('text-center');
    description.innerHTML = 'This is a list of free to play games from the Giant Bomb API';
    outerDiv.appendChild(description);
}

async function getData(){
    await boilerplate();
    var url = 'https://api.aniapi.com/v1/anime';
    // add try catch with fetch and error message
    var data = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyNDUiLCJuYmYiOjE2NDU2OTk0ODEsImV4cCI6MTY0ODI5MTQ4MSwiaWF0IjoxNjQ1Njk5NDgxfQ.is3Wiu4OdGCddM_f7Qcj1-QVYgoHayTvGJRR_8yKGQs',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    var parsedData = await data.json();
    createBoxes(parsedData.data.documents);
}

function createBoxes(data){
    let boxContainer = document.querySelector('.boxContainer');
    for (i of data){
        let box = document.createElement('div');
        box.classList.add('box');
        box.setAttribute('style', 'display: none');
        box.classList.add('col-lg-4');
        box.classList.add('col-md-6');
        box.classList.add('col-sm-6');
        box.classList.add('col-xs-12'); 
        box.innerHTML = `
        <img class="thumbnail" src="${i.cover_image}" alt="${i.titles.en}">
        <div class="text-container">
        <a href="${i.trailer_url}" target="_blank">${i.titles.en}</a>
        <p class="justifiedText">${i.descriptions.en}</p>
        <p>Start Date: ${i.start_date.substring(0,10)} | End Date: ${i.end_date.substring(0,10)}</p>
        <p>Episodes: ${i.episodes_count} | Duration: ${i.episode_duration}</p>
        </div>`
        boxContainer.appendChild(box);
    }
    document.body.innerHTML += `<div id="buttons" class="d-flex justify-content-center">
    <button class="btn btn-light btn-major" id="first">First</button>
    <button class="btn btn-light btn-major" id="prev">Previous</button>
    <div id="custom-buttons"></div>
    <button class="btn btn-light btn-major" id="next">Next</button>
    <button class="btn btn-light btn-major" id="last">Last</button>
    <select class="btn btn-light btn-major" id="page-select">
        <option value="10">10</option>
        <option value="20" selected>20</option>
        <option value="50">50</option>
    </select>
</div>`
pagination();
}

function addbutton(page){
    let button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-light');
    button.innerHTML = page;
    button.addEventListener('click', function(){
        showPage(page);
    });
    document.querySelector('#custom-buttons').appendChild(button);
}


function pagination(){
    let data = document.querySelectorAll('.box');
    let buttons = document.querySelector('#custom-buttons');
    let pageSelect = document.querySelector('#page-select');
    let first = document.querySelector('#first');
    let prev = document.querySelector('#prev');
    let next = document.querySelector('#next');
    let last = document.querySelector('#last');
    let page = 1;
    let pageSize = 20;
    let totalPages = Math.ceil(data.length / pageSize);
    let pageButtons = [];
    for (let i = 1; i <= totalPages; i++){
        pageButtons.push(i);
    }
    pageButtons.forEach(function(page){
        addbutton(page);
    });
    let pageButtonsElements = document.querySelectorAll('#custom-buttons button');
    pageButtonsElements.forEach(function(button){
        button.addEventListener('click', function(){
            page = button.innerHTML;
            showPage(page);
        });
    });
    pageSelect.addEventListener('change', function(){
        pageSize = parseInt(this.value);
        totalPages = Math.ceil(data.length / pageSize);
        pageButtons = [];
        for (let i = 1; i <= totalPages; i++){
            pageButtons.push(i);
        }
        buttons.innerHTML = '';
        pageButtons.forEach(function(button){
            addbutton(button);
        });
        pageButtonsElements = document.querySelectorAll('#custom-buttons button');
        pageButtonsElements.forEach(function(button){
            button.addEventListener('click', function(){
                page = button.innerHTML;
                showPage(page,pageSize);
            });
        });
        showPage(page,pageSize);
    });
    first.addEventListener('click', function(){
        page = 1;
        showPage(page,pageSize);
    });
    prev.addEventListener('click', function(){
        if (page > 1){
            page--;
            showPage(page,pageSize);
        }
    });
    next.addEventListener('click', function(){
        if (page < totalPages){
            page++;
            showPage(page,pageSize);
        }
    });
    last.addEventListener('click', function(){
        page = totalPages;
        showPage(page,pageSize);
    });
    showPage(page,pageSize);
}

function showPage(page,pageSize=20){
    var allbuttons = document.querySelectorAll('#custom-buttons button');
    allbuttons.forEach(function(button){
        button.style.display = 'none';
    });
    for (button of allbuttons){
        if (page == 1 || page==2){
            // display only buttons 1 to 5
            if (button.innerHTML >= 1 && button.innerHTML <= 5){
                button.style.display = 'inline-block';
            }
        // if page is last page then display only buttons -4 to -1
        } else if (page == allbuttons.length || page == allbuttons.length - 1){
            if (button.innerHTML >= allbuttons.length - 4 && button.innerHTML <= allbuttons.length){
                button.style.display = 'inline-block';
            }
        }
        // if page is between 3 and allbuttons.length - 3 display 2 buttons before and 2 buttons after current page
        else if (page >= 3 && page <= allbuttons.length - 2){
            if (button.innerHTML >= parseInt(page) - 2 && button.innerHTML <= parseInt(page) + 2){
                button.style.display = 'inline-block';
            }
        }        
    }
    let data = document.querySelectorAll('.box');
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    for (let i = 0; i < data.length; i++){
        if (i >= startIndex && i < endIndex){
            data[i].style.display = 'flex';
        } else {
            data[i].style.display = 'none';
        }
    }
}

getData();
