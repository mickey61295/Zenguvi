// token : 4o7W7Cr1oEGiEWGiuOpK04P8xEhzJmBaaOcg11Qc
var url = new URL('https://quizapi.io/api/v1/questions'),
	params = { apiKey: '4o7W7Cr1oEGiEWGiuOpK04P8xEhzJmBaaOcg11Qc' }
Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))

categories = {
	Linux: 'https://quizapi.io/storage/tags/March2020/5uIu0w9XQPSnjSk91GfG.jpg',
	BASH: 'https://quizapi.io/storage/tags/March2020/PV9mMjSKqMy1qrTSNr1S.jpg',
	PHP: 'https://quizapi.io/storage/tags/March2020/AVhzCCNLb7mlFnjC9kQZ.jpeg',
	Docker: 'https://quizapi.io/storage/tags/March2020/tihRrer2wU1eihlwHSXr.jpg',
	HTML: 'https://quizapi.io/storage/tags/March2020/kEEwOFhlkEoYBfIpnFdP.jpg',
	MySQL: 'https://quizapi.io/storage/tags/April2020/QaxvuS4XUSUImsuYGzb2.jpg',
	WordPress:
		'https://quizapi.io/storage/tags/April2020/LUygVKKNhVBVRlwNmLPJ.jpg',
	Laravel: 'https://quizapi.io/storage/tags/April2020/nqpV0lwwcD8GNA0umF4A.jpg',
	Kubernetes:
		'https://www.cloudsigma.com/wp-content/uploads/How-To-Create-a-Kubernetes-Cluster-Using-Kubeadm-on-Ubuntu-18.jpg',
	JavaScript:
		'https://quizapi.io/storage/tags/April2020/o4ahLHmk4jwCrwh63Lyu.png',
	DevOps: 'https://quizapi.io/storage/tags/May2020/q2wN62LF7ERfYoB1VZIm.jpg',
}

const categoriesBody = document.getElementsByClassName('categories_body')[0]

for (i of Object.keys(categories)) {
	categoriesBody.innerHTML += `<div class="card nameHolder"
	onclick="location.href='./${i}.html'"
	style="width: 18rem;
    background-image: url(${categories[i]});
    background-size: cover; 
    height: 13rem;
    width: 18rem;
    opacity: 1;
    background-repeat: no-repeat;
    box-shadow:inset 0 0 0 2000px rgba(0, 0, 0, 0.5);

    ">
    <p class = "box-text" style="color:white;">${i}</p></img>
  </div>`
}

function Hello() {
	console.log('hello')
}
