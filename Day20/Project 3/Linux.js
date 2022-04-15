var title = document.title
var url = new URL('https://quizapi.io/api/v1/questions'),
	params = {
		apiKey: '4o7W7Cr1oEGiEWGiuOpK04P8xEhzJmBaaOcg11Qc',
		Category: title,
		limit: 10,
	}
Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))
const body = document.getElementsByClassName('questions_body')[0]
body.classList.add('container')
body.classList.add('container-fluid')
var questions = []
fetch(url)
	.then((res) => res.json())
	.then((data) => {
		//"id"
		//"question"
		//"description"
		//"answers"
		//"multiple_correct_answers"
		//"correct_answers"
		//"correct_answer"
		//"explanation"
		//"tip"
		//"tags"
		// "category"
		// "difficulty
		// Add all these as quiz questions to the page
		questions = data
		for (i of data) {
			displayQuestions(i, data.indexOf(i))
		}
	})

function displayQuestions(i, ind) {
	console.log(ind)
	const qContainer = document.createElement('div')
	qContainer.className = 'quiz_container'
	const question = document.createElement('h4')
	question.className = 'question'
	question.innerHTML = i.question
	qContainer.appendChild(question)

	const ans = i.answers
	const answers = document.createElement('div')
	answers.className = 'answers'
	var ansObj = {}
	Object.values(i.answers).forEach((element, index) => {
		ansObj[element] = Object.values(i.correct_answers)[index]
	})
	Object.keys(ans).map((key) => {
		const answer = document.createElement('h6')
		answer.className = 'answer'
		if (ans[key] != null) {
			answer.innerHTML = ans[key]
			answers.appendChild(answer)
		}
		answer.onclick = function () {
			if (ansObj[ans[key]] === 'true') {
				answer.style.backgroundColor = 'lightgreen'
			} else {
				answer.style.backgroundColor = 'pink'
			}
		}
	})
	qContainer.appendChild(answers)
	if (ind != 0) {
		qContainer.style.display = 'none'
	}
	body.appendChild(qContainer)
	const submit = document.createElement('button')
	submit.className = 'submit'
	submit.classList.add('btn')
	submit.classList.add('btn-success')
	submit.innerHTML = 'Submit Answer'
	submit.onclick = function () {
		if (ind != 9) {
			document.getElementsByClassName('next')[ind].disabled = false
		}
	}
	qContainer.appendChild(submit)
	const buttons = document.createElement('div')
	buttons.className = 'buttons'
	const next = document.createElement('button')
	next.className = 'next'
	next.classList.add('btn')
	next.classList.add('btn-primary')
	next.innerHTML = 'Next'
	next.disabled = true
	next.onclick = function () {
		qContainer.style.display = 'none'
		qContainer.nextElementSibling.style.display = 'block'
	}
	const prev = document.createElement('button')
	prev.className = 'prev'
	prev.classList.add('btn')
	prev.classList.add('btn-primary')
	prev.innerHTML = 'Previous'
	prev.onclick = function () {
		qContainer.style.display = 'none'
		qContainer.previousElementSibling.style.display = 'block'
	}
	if (ind == 0) {
		prev.disabled = true
	}
	if (ind == questions.length - 1) {
		next.disabled = true
	}
	buttons.appendChild(prev)
	buttons.appendChild(next)
	qContainer.appendChild(buttons)
}
