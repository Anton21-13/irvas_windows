function modal() {
 
  let engineerButton = document.querySelector('.popup_engineer_btn'), 
		popupEngineer = document.querySelector('.popup_engineer'); 	


	engineerButton.addEventListener('click', () => {
		popupEngineer.style.display = "block";
		document.body.style.overflow = "hidden";
	});

	closeModal(popupEngineer, 'popup_engineer', 'popup_close');


  let phoneLink = document.querySelectorAll('.phone_link'), 			
		popupModal = document.querySelector('.popup'); 						

	phoneLink.forEach(element => {
		element.addEventListener('click', () => {
			event.preventDefault();
			popupModal.style.display = "block";
			document.body.style.overflow = "hidden";
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
			document.body.style.overflow = "";
	
			if (target.classList.contains(closeSelector) ||
				target.parentNode.classList.contains(closeSelector) ||
				target.classList.contains(selector)) {
				trigger.style.display = 'none';
			}
		});
	}


	setTimeout(() => {
		if (popupEngineer.style.display === "block" 
			|| popupModal.style.display === "block"
			|| popupCalcEnd.style.display === "block") {
			return;
		} else {
		popupModal.style.display = "block";
		document.body.style.overflow = "hidden";
		}
	}, 60 * 1000);	

}

module.exports = modal;