function modal() {

  let pictures = document.querySelectorAll('.lupa_tab'),
    btnPopupEngineer = document.querySelector('.popup_engineer_btn'),
    modalWorks = document.querySelector('.works'),
    closePopup = document.querySelectorAll('.popup_close')[0],
    closePopupEngineer = document.querySelectorAll('.popup_close')[1];

  function modalOpenWorks() {
    modalWorks.style.display = 'block';
    document.body.style = 'background-color: rgba(0, 0, 0, 0.5)';
  }


  // function modalCloseWorks() {
  //   modalPopup.style.display = 'none';
  //   document.body.style.background = '#fff';
  // }


  pictures.forEach((item) => {
    item.addEventListener('click', modalOpenWorks);
  });



}

module.exports = modal;