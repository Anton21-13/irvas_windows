function form() {

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжимся!',
    failure: 'Что-то пошло не так...'
  };

  let form = document.querySelectorAll('form'),
    input = document.getElementsByTagName('input'),
    statusMessage = document.createElement('div'),
    inputPhone = document.getElementsByName('user_phone');


  form.forEach(function submissionForm(element) {
    element.addEventListener('submit', (a) => {
      a.preventDefault();
      element.appendChild(statusMessage);
      let formData = new FormData(element);

      let obj = {};

      formData.forEach((value, key) => {
        obj[key] = value;
      });

      let json = JSON.stringify(obj);
      

      function postData() {
        return new Promise((resolve, reject) => {
          let request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

          request.onreadystatechange = () => {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4) {
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

      function clearInput() {
        for (let i = 0; i < input.length; i++) {
          input[i].value = '';
        }
      }  

      postData(formData)
      .then(() => statusMessage.innerHTML = message.loading)
      .then(() => {
        statusMessage.innerHTML = message.success;
        setTimeout(cleaner, 3000);
      })
      .catch(() => statusMessage.innerHTML = message.failure)
      .then(clearInput);
    });
  });

  function cleaner() {
    statusMessage.innerHTML = "";
  }

  inputPhone.forEach((item) => {
    item.addEventListener('focus', () => {
      if (!/^\+\d*$/.test(item.value))
        item.value = '+';
    });

    item.addEventListener('keypress', (e) => {
      if (!/\d/.test(e.key)) {
        e.preventDefault();
        alert("Прошу вводить только цифры")
      } else {
        if (item.value.length == 2) item.value = item.value + "(";
        if (item.value.length == 6) item.value = item.value + ")-";
        if (item.value.length == 11) item.value = item.value + "-";
        if (item.value.length == 14) item.value = item.value + "-";
        if (item.value.length > 16) item.value = item.value.substring(0, 16);
      }
    });
  });

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


}

module.exports = form;

