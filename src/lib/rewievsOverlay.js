// rewievs overlay

const reviewsList = document.querySelector('#reviews-list');
const reviewsBtns = reviewsList.querySelectorAll('.sixth__inner-link');
const reviewsOverlay = createReviewsOverlay();
const reviewsOverlayBtn = reviewsOverlay.querySelector('#reviews-overlay-btn');

reviewsBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let text = e.target.parentNode.querySelector('.sixth__inner-text').innerText;
    let title = e.target.parentNode.querySelector('.sixth__inner-title').innerText;
    e.preventDefault();
    reviewsOverlay.querySelector('.overlay__title').innerText = title;
    reviewsOverlay.querySelector('.overlay__text').innerText = text;
    body.appendChild(reviewsOverlay);
  });
});

reviewsOverlayBtn.addEventListener('click', (e) => {
  e.preventDefault();
  body.removeChild(reviewsOverlay);
});


function createReviewsOverlay() {
  let overlay =  document.createElement('div');
  overlay.innerHTML = document.querySelector('#reviews-overlay').innerHTML;
  overlay.classList.add('overlay');
  overlay.classList.add('overlay--rewievs');

  return overlay;
}