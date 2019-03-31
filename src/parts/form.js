function form() {

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжимся!',
    failure: 'Что-то пошло не так...'
  };

  let form = document.querySelectorAll('.form'),
    input = document.getElementsByTagName('.input'),
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
            } else if (request.readyState === 4 && request.status == 200) {
              resolve();
            } else {
              reject();
            }
          };
          request.send(json);
        });
      }

      function clearInput() {
        for (let i = 0; i < input.length; i++) {
          input[i].value = '';
        }
        statusMessage.innerHTML = '';
      }

      postData(formData)
      .then(() => statusMessage.innerHTML = message.loading)
      .then(() => statusMessage.innerHTML = message.success)
      .catch(() => statusMessage.innerHTML = message.failure)
      .then(() => setTimeout(clearInput, 4000));
    });
  });

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
}

module.exports = form;

