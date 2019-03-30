function modal() {

  let btn = document.querySelector('.popup_engineer_btn'),
    overlay = document.querySelector('.popup_engineer'),
    close = document.querySelector('#popup_engineer_close'),
    closeBack = document.querySelector('.popup_dialog');

  function modalOpen() {
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function modalClose() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }
  btn.addEventListener('click', modalOpen);

  close.addEventListener('click', modalClose);

  overlay.addEventListener('click', modalClose);


}

module.exports = modal;