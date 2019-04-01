// import submissionForm from './index';

function calc() {

  let popupCalcBtn = document.querySelectorAll('.popup_calc_btn'), // Кнопки вызова первого окна
    popupCalc = document.querySelector('.popup_calc'), // Модальное окно выбора формы балкона
    balconIcons = document.querySelectorAll('.balcon_icons a'), // меню выбора формы балкона
    bigImg = document.querySelectorAll('.big_img img'), // Блоки с большыми картинками
    popupCalcButton = document.querySelector('.popup_calc_button'), // Кнопка "Далее"
    popupCalcProfile = document.querySelector('.popup_calc_profile'), // Второе модальное окно
    popupCalcProfileButton = document.querySelector('.popup_calc_profile_button'), // Третье модальное окно
    popupCalcEnd = document.querySelector('.popup_calc_end'), // Третье модальное окно
    popupCalcInput = popupCalc.querySelectorAll('input'),
    popupCalcSelect = document.querySelector('select'),
    popupCalcLabel = popupCalcProfile.querySelectorAll('label'),
    windowSettings = {};

  popupCalcBtn.forEach(element => {
    element.addEventListener('click', () => {
      popupCalc.style.display = "block";
      windowSettings.type = balconIcons[0].getAttribute('class');
    });
  });
  
  popupCalc.addEventListener('click', (event) => {
		const target = event.target;

		if (target.classList.contains('popup_calc_close') ||
			target.parentNode.classList.contains('popup_calc_close') ||
			target.classList.contains('popup_calc')) {
			popupCalc.style.display = 'none';
			windowSettings = {};
		}
  });
  
  balconIcons.forEach(element => {
		element.addEventListener('click', (event) => {
			event.preventDefault();
			const typeWindowCalc = event.target.parentNode.getAttribute('class');

			bigImg.forEach(el => {
				const typeSelectedWindow = el.getAttribute('id');
				if (typeSelectedWindow == typeWindowCalc) {
					el.style.display = 'inline-block';
					windowSettings.type = typeWindowCalc;
				} else {
					el.style.display = 'none';
				}
			});
			console.log(windowSettings);
		});
  });
  
  popupCalcInput.forEach(input => {
		input.addEventListener('keyup', function () {
			this.value = this.value.replace(/[^0-9]+/g, '');
			input.textContent = this.value;
		});
  });
  
  popupCalcButton.addEventListener('click', () => {
		if (popupCalcInput[0].value && popupCalcInput[1].value) {
			popupCalc.style.display = 'none';
			popupCalcProfile.style.display = 'block';
			windowSettings.width = popupCalcInput[0].value;
			windowSettings.heigh = popupCalcInput[1].value;
			windowSettings.glazingType = popupCalcSelect.options[0].value;
		} else {
			popupCalcInput.forEach(input => {
				if (!input.value) {
					input.focus();
				}
			});
		}
  });
  
  popupCalcSelect.addEventListener('change', function () {
		windowSettings.glazingType = this.options[this.selectedIndex].value;
  });
  
  popupCalcLabel.forEach(label => {
		label.addEventListener('change', event => {
			if (event.target.classList.contains('checkbox')) {
				[].slice.call(document.querySelectorAll('.checkbox')).forEach(c => c.checked = false);
				event.target.checked = true;
			}
			windowSettings.glazingProfile = label.querySelector('.checkbox-custom').getAttribute('id');
		});
  });
  
	popupCalcProfileButton.addEventListener('click', () => {
		if (windowSettings.glazingProfile) {
			popupCalcProfile.style.display = 'none';
			popupCalcEnd.style.display = 'block';
		}
	});

	popupCalcProfile.addEventListener('click', (event) => {
		const target = event.target;

		if (target.classList.contains('popup_calc_profile_close') ||
			target.parentNode.classList.contains('popup_calc_profile_close') ||
			target.classList.contains('popup_calc_profile')) {
			popupCalcProfile.style.display = 'none';
			windowSettings = {};
		}
	});

	popupCalcEnd.addEventListener('click', (event) => {
		const target = event.target;

		if (target.classList.contains('popup_calc_end_close') ||
			target.parentNode.classList.contains('popup_calc_end_close') ||
			target.classList.contains('popup_calc_end')) {
			popupCalcEnd.style.display = 'none';
			windowSettings = {};
		}
	});	

	const popupCalcEndForms = document.querySelector('.popup_calc_end form');
	submissionForm(popupCalcEndForms, windowSettings);
}

module.exports = calc;
