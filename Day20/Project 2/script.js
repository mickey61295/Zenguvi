function boilerplate() {
	const body = document.body

	const outerDiv = document.createElement('div')
	outerDiv.classList.add('container-fluid')
	body.appendChild(outerDiv)

	const boxContainer = document.createElement('div')
	boxContainer.classList.add('boxContainer')
	body.appendChild(boxContainer)

	const title = document.createElement('h1')
	title.classList.add('text-center')
	title.innerHTML = 'Free to Play Games Database'
	outerDiv.appendChild(title)

	const description = document.createElement('p')
	description.classList.add('text-center')
	description.innerHTML =
		'This is a list of free to play games from the Giant Bomb API'
	outerDiv.appendChild(description)
}

async function getData() {
	await boilerplate()
	var url = 'https://api.aniapi.com/v1/anime'
	// add try catch with fetch and error message
	var data = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyNDUiLCJuYmYiOjE2NDU2OTk0ODEsImV4cCI6MTY0ODI5MTQ4MSwiaWF0IjoxNjQ1Njk5NDgxfQ.is3Wiu4OdGCddM_f7Qcj1-QVYgoHayTvGJRR_8yKGQs',
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
	var parsedData = await data.json()
	createBoxes(parsedData.data.documents)
}

function createBoxes(data) {
	let boxContainer = document.querySelector('.boxContainer')
	for (i of data) {
		let box = document.createElement('div')
		box.classList.add('box')
		box.setAttribute('style', 'display: none')
		box.classList.add('col-lg-4')
		box.classList.add('col-md-6')
		box.classList.add('col-sm-6')
		box.classList.add('col-xs-12')
		box.innerHTML = `
        <img class="thumbnail" src="${i.cover_image}" alt="${i.titles.en}">
        <div class="text-container">
        <a href="${i.trailer_url}" target="_blank">${i.titles.en}</a>
        <p>${i.descriptions.en}</p>
        <p>Episodes: ${i.episodes_count}</p>
        <p>End Date: ${i.end_date}</p>
        </div>`
		boxContainer.appendChild(box)
	}
	document.body.innerHTML += `<div id="buttons" class="d-flex justify-content-center">
    <button class="btn btn-light" id="first">First</button>
    <button class="btn btn-light" id="prev">Previous</button>
    <div id="custom-buttons"></div>
    <button class="btn btn-light" id="next">Next</button>
    <button class="btn btn-light" id="last">Last</button>
    <select class="btn btn-light" id="page-select">
        <option value="10">10</option>
        <option value="20" selected>20</option>
        <option value="50">50</option>
    </select>
</div>`
	pagination()
}

function pagination() {
	let data = document.querySelectorAll('.box')
	let buttons = document.querySelector('#custom-buttons')
	let pageSelect = document.querySelector('#page-select')
	let first = document.querySelector('#first')
	let prev = document.querySelector('#prev')
	let next = document.querySelector('#next')
	let last = document.querySelector('#last')
	let page = 1
	let pageSize = 20
	let totalPages = Math.ceil(data.length / pageSize)
	let pageButtons = []
	for (let i = 1; i <= totalPages; i++) {
		pageButtons.push(i)
	}
	pageButtons.forEach(function (button) {
		let buttonElement = document.createElement('button')
		buttonElement.classList.add('btn')
		buttonElement.classList.add('btn-light')
		buttonElement.innerHTML = button
		buttons.appendChild(buttonElement)
	})
	let pageButtonsElements = document.querySelectorAll('#custom-buttons button')
	pageButtonsElements.forEach(function (button) {
		button.addEventListener('click', function () {
			page = button.innerHTML
			showPage(page)
		})
	})
	pageSelect.addEventListener('change', function () {
		pageSize = parseInt(this.value)
		totalPages = Math.ceil(data.length / pageSize)
		pageButtons = []
		for (let i = 1; i <= totalPages; i++) {
			pageButtons.push(i)
		}
		buttons.innerHTML = ''
		pageButtons.forEach(function (button) {
			let buttonElement = document.createElement('button')
			buttonElement.classList.add('btn')
			buttonElement.classList.add('btn-light')
			buttonElement.innerHTML = button
			buttons.appendChild(buttonElement)
		})
		pageButtonsElements = document.querySelectorAll('#custom-buttons button')
		pageButtonsElements.forEach(function (button) {
			button.addEventListener('click', function () {
				page = button.innerHTML
				showPage(page, pageSize)
			})
		})
		showPage(page, pageSize)
	})
	first.addEventListener('click', function () {
		page = 1
		showPage(page, pageSize)
	})
	prev.addEventListener('click', function () {
		if (page > 1) {
			page--
			showPage(page, pageSize)
		}
	})
	next.addEventListener('click', function () {
		if (page < totalPages) {
			page++
			showPage(page, pageSize)
		}
	})
	last.addEventListener('click', function () {
		page = totalPages
		showPage(page, pageSize)
	})
	showPage(page, pageSize)
}

function showPage(page, pageSize = 20) {
	let data = document.querySelectorAll('.box')
	let startIndex = (page - 1) * pageSize
	let endIndex = startIndex + pageSize
	for (let i = 0; i < data.length; i++) {
		if (i >= startIndex && i < endIndex) {
			data[i].style.display = 'flex'
		} else {
			data[i].style.display = 'none'
		}
	}
}

getData()
