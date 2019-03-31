function pictures() {

  // let works = document.querySelectorAll('.works .row div');

	// works.forEach((work) => {
	//   work.addEventListener('click', (e) => {
	//     e.preventDefault();

	//     let popupImage = document.createElement('div');
	//     let curentImage = document.createElement('img');
	//     let curentImageHref = work.querySelector('a').getAttribute('href');

	//     popupImage.classList.add('popup');
	//     curentImage.setAttribute('src', curentImageHref);
	//     popupImage.appendChild(curentImage);
	//     document.body.appendChild(popupImage);
	//     popupImage.style.display = 'flex';
	//     popupImage.style.alignItems = 'center';
	//     popupImage.style.justifyContent = 'center';

	//     popupImage.addEventListener('click', (e) => {
	//       if (e.target.classList.contains('popup')) {
	//         popupImage.style.display = 'none';
	//         document.body.removeChild(popupImage);
	//       }
	//     });
	//   });
  // });

  let overlay = document.createElement('div');
      overlay.classList.add('works_overlay');

  document.body.addEventListener('click', (e) => {
    let t = e.target;
    if(t.classList.contains('works_overlay')){
      overlay.parentElement.removeChild(overlay);
      document.body.parentElement.style.overflow = '';
    }
    if(t.classList.contains('lightbox') && t.tagName == 'IMG' && !t.classList.contains('lupa')){
      e.preventDefault();
      overlay.innerHTML = '';

      let block = document.createElement('img'),
        tsrc = t.getAttribute('src');

      tsrc = tsrc.slice(0, 13) + "/big_img" + tsrc.slice(13, tsrc.length);
      block.setAttribute("src", tsrc);
          
      overlay.appendChild(block);
      document.body.appendChild(overlay);
      document.body.parentElement.style.overflow = 'hidden';
    }
  });
}

module.exports = pictures;