function modal() {

  let modalPopup = document.querySelector('.popup'),
    callBack = document.querySelectorAll('.phone_link'),

    modalPopupEngineer = document.querySelector('.popup_engineer'),
    popupBtn = document.querySelector('.header_btn'),

    closePopup = document.getElementsByClassName('popup_close')[0],
    closePopupEngineer = document.getElementsByClassName('popup_close')[1];

  callBack.forEach(function (item) {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      modalPopup.style.display = 'block';
      document.body.parentElement.style.overflow = 'hidden';
    });
  });

  popupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalPopupEngineer.style.display = 'block';
    document.body.parentElement.style.overflow = 'hidden';
  });

  setTimeout(() => {
    modalPopup.style.display = "block";
  }, 60 * 1000);
  
  closePopup.addEventListener('click', () => {
    modalPopup.style.display = 'none';
    document.body.parentElement.style.overflow = '';
  });

  window.addEventListener('click', (e) => {
    if (e.target == modalPopup) {
      modalPopup.style.display = 'none';
      document.body.parentElement.style.overflow = '';
    }
  });

  closePopupEngineer.addEventListener('click', () => {
    modalPopupEngineer.style.display = 'none';
    document.body.parentElement.style.overflow = '';
  });

  window.addEventListener('click', (e) => {
    if (e.target == modalPopupEngineer) {
      modalPopupEngineer.style.display = 'none';
      document.body.parentElement.style.overflow = '';
    }
  });

}

module.exports = modal;