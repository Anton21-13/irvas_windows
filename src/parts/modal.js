function modal() {

  let callBack = document.querySelectorAll('.phone_link'),
    btnPopupEngineer = document.querySelector('.popup_engineer_btn'),
    modalPopup = document.querySelector('.popup'),
    modalPopupEngineer = document.querySelector('.popup_engineer'),
    closePopup = document.querySelectorAll('.popup_close')[0],
    closePopupEngineer = document.querySelectorAll('.popup_close')[1];

  function modalOpenPopup() {
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

  callBack[0].addEventListener('click', modalOpenPopup);
  callBack[1].addEventListener('click', modalOpenPopup);
  closePopup.addEventListener('click', modalClosePopup);
  modalPopup.addEventListener('click', modalClosePopup);

  btnPopupEngineer.addEventListener('click', modalOpenPopupEngineer);
  closePopupEngineer.addEventListener('click', modalClosePopupEngineer);
  modalPopupEngineer.addEventListener('click', modalClosePopupEngineer);

}

module.exports = modal;