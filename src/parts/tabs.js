function tabs() {

  let tab = document.querySelectorAll('.decoration_item'),
    tabLine = document.querySelectorAll('.decoration_slider_tab'),
    info = document.querySelector('.decoration_slider'),
    tabContent = document.querySelectorAll('.info-tabcontent');


  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].style.display = 'none';
    }
  }
  hideTabContent(1);


  function showTabContent(b) {
    if (tabContent[b].style.display = 'none') {
      tabContent[b].style.display = 'block';
    }
  }

  info.addEventListener('click', (event) => {
    let target = event.target;
    if (target && target.classList.contains('decoration_item')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  // info.addEventListener('click', (event) => {
  //   let target = event.target;
  //   if (target && target.classList.contains('.decoration_slider_tab')) {
  //     for (let i = 0; i < tabLine.length; i++) {
  //       // tabContent[i].classList.remove('show');
  //       tabLine[i].classList.add('after_click');
  //     }
  //     // for (let i = 0; i < tab.length; i++) {
  //     //   if (target == tab[i]) {
  //     //     hideTabContent(0);
  //     //     showTabContent(i);
  //     //     break;
  //     //   }
  //     // }
  //   }
  // });


  
}

module.exports = tabs;
