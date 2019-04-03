function form(windowSettings) {

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
};
	
	//Формы на сайте
	let freeMasterForms = document.querySelectorAll('.main_form');
	freeMasterForms.forEach(form => {
		sendForm(form);
	});

	// Формы модальных окон "Обратного звонка"
	let popupForm = document.querySelector('.popup form');
	sendForm(popupForm);

	// Формы модальных окон "Вызов замерщика"
	let popupEngineerForm = document.querySelector('.popup_engineer form');
	sendForm(popupEngineerForm);

	// Формы модальных окон "Отправка калькулятора"
	let popupCalcEndForms = document.querySelector('.popup_calc_end form');
	sendForm(popupCalcEndForms, windowSettings);


	// let popupCalcEnd = document.querySelector('.popup_calc_end'),
	//   overlay = document.querySelector('.popup_engineer'),
  //   popup = document.querySelector('.popup');

	function sendForm(form, object = null) {
		let statusMessage = document.createElement('div'),
			curentFormInputs = form.querySelectorAll('input');

		form.addEventListener('submit', event => {
			event.preventDefault();
			form.appendChild(statusMessage);
      let formData = new FormData(form);
      
			postData(formData, object)
        // .then(() => statusMessage.innerHTML = message.loading)
        .then(() => {
					statusMessage.innerHTML = message.success;
					// setTimeout(send, 4000);
				})
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput(curentFormInputs))
				.then(clearObject(object));
		});
	}

	function postData(data, object = null) {
		return new Promise(function (resolve, reject) {
			let request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			request.setRequestHeader('Content-Type', 'aplication/json charset=utf-8');
			let json = formDataToJSON(data, object);
			request.onreadystatechange = () => {
				if (request.readyState == 4) {
					if (request.status == 200) {
						resolve();
					} else {
						reject();
					}
				}
			};
			request.send(json);
		});
	}

	
	// function send() {
	// 	statusMessage.innerHTML = "";
	// 	popupCalcEnd.style.display = 'none';
	// 	overlay.style.display = 'none';
	// 	popup.style.display = 'none';
	// }	

	function formDataToJSON(formData, object = null) {
		let obj = {};
		formData.forEach((value, key) => {
			obj[key] = value;
		});
		if (object) {
			return JSON.stringify(Object.assign(object, obj));
		} else {
			return JSON.stringify(obj);
		}
	}

	function clearInput(inputs) {
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].value = '';
		}
	}

	function clearObject(object) {
		object = {};
	}
}

module.exports = form;
