function modal() {
 
  let engineerButton = document.querySelector('.popup_engineer_btn'), 
		popupEngineer = document.querySelector('.popup_engineer'); 	


	engineerButton.addEventListener('click', () => {
		popupEngineer.style.display = "block";
	});

	closeModal(popupEngineer, 'popup_engineer', 'popup_close');


  let phoneLink = document.querySelectorAll('.phone_link'), 			
		popupModal = document.querySelector('.popup'); 						

	phoneLink.forEach(element => {
		element.addEventListener('click', () => {
			event.preventDefault();
			popupModal.style.display = "block";
		});
	});


	closeModal(popupModal, 'popup', 'popup_close');

	let popupCalcProfile = document.querySelector('.popup_calc_profile'),
		popupCalcEnd = document.querySelector('.popup_calc_end'),
		popupCalc = document.querySelector('.popup_calc');

	closeModal(popupCalc, 'popup_calc', 'popup_calc_close');

	closeModal(popupCalcProfile, 'popup_calc_profile', 'popup_calc_profile_close');

	closeModal(popupCalcEnd, 'popup_calc_end', 'popup_calc_end_close');

	function closeModal (trigger, selector, closeSelector){
		trigger.addEventListener('click', (event) => {
			let target = event.target;
	
			if (target.classList.contains(closeSelector) ||
				target.parentNode.classList.contains(closeSelector) ||
				target.classList.contains(selector)) {
				trigger.style.display = 'none';
			}
		});
	}


	setTimeout(() => {
		popupModal.style.display = "block";
	}, 60 * 1000);
}

module.exports = modal;