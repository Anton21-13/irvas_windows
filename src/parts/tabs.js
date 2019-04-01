function tabs() {

  let glazingSlider = document.querySelector('.glazing_slider'),
		glazingBlock = document.querySelectorAll('.glazing_block'),
		glazingRow = document.querySelectorAll('.glazing .row');

	hideTabContent(1, glazingRow);

	glazingSlider.addEventListener('click', function (event) {
		let target = event.target;
		if (!target.classList.contains('glazing_block')) {
			target = target.parentNode;
		}

		if (target) {
			for (let i = 0; i < glazingBlock.length; i++) {
				glazingBlock[i].querySelector('a').classList.remove('active');
				if (glazingBlock[i] == target) {
					hideTabContent(0, glazingRow);
					showTabContent(i, glazingRow);
				}
			}
			target.querySelector('a').classList.add('active');
		}
	});


  function hideTabContent(a, b) {
    for (let i = a; i < b.length; i++) {
      b[i].classList.remove('show');
      b[i].classList.add('hide');
      if (b[i].classList.contains('big_img-item')) {
        b[i].style.margin = 'auto';
        b[i].style.marginBottom = '10px';
      }
    }
  }

  function showTabContent(key, slideItems) {

    if (slideItems[key].classList.contains('hide')) {
      slideItems[key].classList.remove('hide');
      slideItems[key].classList.add('show');
    }
  }


}

module.exports = tabs;
