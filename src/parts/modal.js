function modal() {

  let callBack = document.querySelectorAll('.phone_link'),
    btnPopupEngineer = document.querySelector('.popup_engineer_btn'),
    modalPopup = document.querySelector('.popup'),
    modalPopupForm = document.querySelectorAll('.popup_form'),
    modalPopupEngineer = document.querySelector('.popup_engineer'),
    closePopup = document.querySelectorAll('.popup_close')[0],
    closePopupEngineer = document.querySelectorAll('.popup_close')[1];

  function modalOpenPopup(event) {
    event.preventDefault();
    modalPopup.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function modalOpenPopupEngineer() {
    modalPopupEngineer.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function modalClosePopup() {
    modalPopup.style.display = 'none';
    document.body.style.overflow = '';
  }

  function modalClosePopupEngineer() {
    modalPopupEngineer.style.display = 'none';
    document.body.style.overflow = '';
  }

  // function modalClosePopupTwo(event) {
  //   const target = event.target;

	// 	if (target.classList.contains('popup_close') ||
	// 		target.parentNode.classList.contains('popup_close') ||
	// 		target.classList.contains('popup')) {
  //     modalPopup.style.display = 'none';
	// 	}
  // }

  // function modalClosePopupEngineerTwo(event) {
  //   const target = event.target;

	// 	if (target.classList.contains('popup_close') ||
	// 		target.parentNode.classList.contains('popup_close') ||
	// 		target.classList.contains('popup_engineer')) {
  //     modalPopup.style.display = 'none';
	// 	}
  // }

  modalPopup.addEventListener('click', (event) => {
		const target = event.target;

		if (target.classList.contains('popup_close') ||
			target.parentNode.classList.contains('popup_close') ||
			target.classList.contains('popup')) {
      modalPopup.style.display = 'none';
		}
  });
  
  modalPopupEngineer.addEventListener('click', (event) => {
		const target = event.target;

		if (target.classList.contains('popup_close') ||
			target.parentNode.classList.contains('popup_close') ||
			target.classList.contains('popup_engineer')) {
      modalPopupEngineer.style.display = 'none';
		}
	});



  callBack[0].addEventListener('click', modalOpenPopup);
  callBack[1].addEventListener('click', modalOpenPopup);
  closePopup.addEventListener('click', modalClosePopup);
  // modalPopup.addEventListener('click', modalClosePopupTwo);

  btnPopupEngineer.addEventListener('click', modalOpenPopupEngineer);
  closePopupEngineer.addEventListener('click', modalClosePopupEngineer);
  // modalPopupEngineer.addEventListener('click', modalClosePopupEngineerTwo);
  
  setTimeout(() => {
		modalPopup.style.display = "block";
	}, 60 * 1000);

}

module.exports = modal;