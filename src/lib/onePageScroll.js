// one page scroll

const onPageScrollWrapper = document.querySelector('#wrapper-scroll');
const onePageScrollAnimationDuration = 900;
const sectionsArray = onPageScrollWrapper.querySelectorAll('section');
const section = onPageScrollWrapper.querySelector('section');
const sectionsArrayMaxPosition = sectionsArray.length - 1;
const navBtns = document.querySelectorAll('.nav-btn');
const asideNavigation = document.querySelectorAll('.navigation__link');
var sectionHeight = parseInt(getComputedStyle(section).height);
var isBeingAnimated = false;
var sectionPosition = 0;
var mobileStartY = 0;

window.addEventListener('resize', () => {
    delayFunc(() =>{
      resizeWindow();
    }, 1000);
});

var delayFunc = (function(){
  var timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  }
})();

function resizeWindow() {
  sectionHeight = parseInt(getComputedStyle(section).height);
  sliderItemHeight = parseInt(getComputedStyle(sliderItem).width);
  if (!isBeingAnimated) {
    let resizeOnePageScroll = -1 * sectionHeight * sectionPosition;
    onPageScrollWrapper.style['transform'] = `translate(0, ${resizeOnePageScroll}px)`;
    let resizeSlider = -1 * sliderItemHeight * sliderCurentPosition;
    slider.style['transform'] = `translate(${resizeSlider}px, 0)`;
  }
}

document.addEventListener('touchstart', (e) => {
  let mobileTouch = e.touches;

  if (mobileTouch && mobileTouch.length) {
    mobileStartY = mobileTouch[0].pageY;

    document.addEventListener('touchmove', touchMove);
  }
});
    
function touchMove(e) {
  let mobileMove = e.touches;

  if (mobileMove && mobileMove.length) {
    let deltaY = mobileStartY - mobileMove[0].pageY;
    if (!isBeingAnimated) {
      if ((deltaY > 50) && (sectionPosition < sectionsArrayMaxPosition)) {
        isBeingAnimated = true;
        onePageScrollPrepareToAnimate('up');
        document.removeEventListener('touchmove', touchMove);
      }

      if ((deltaY < -50) && (sectionPosition > 0)) {
        isBeingAnimated = true;
        onePageScrollPrepareToAnimate('down');
        document.removeEventListener('touchmove', touchMove);
      }
    }
  }

}

document.addEventListener("wheel", (e) =>{
  if (!isBeingAnimated) {

    if ((e.deltaY < 0)&&(sectionPosition > 0)) {
      onePageScrollPrepareToAnimate('down');
    }

    if ((e.deltaY > 0)&&(sectionPosition < sectionsArrayMaxPosition)) {
      onePageScrollPrepareToAnimate('up');
    }

  }
});

function onePageScrollPrepareToAnimate(direction) {
  
  isBeingAnimated = true;
  let currentPosition = getcurrentPosition(sectionPosition);
  let toPosition = 0;
  let duration = onePageScrollAnimationDuration;
  const animatedProp = 'translateY';

  if (direction === 'down') {
    toPosition = (sectionPosition - 1) * -sectionHeight;
  } else if (direction === 'up') {
    toPosition = (sectionPosition + 1) * -sectionHeight;
  }

  setActiveItemInNavMenu(toPosition, sectionHeight);
  animateTranslate(onPageScrollWrapper, animatedProp, currentPosition, toPosition, duration).then(() => {
    isBeingAnimated = false;
  });
}

function getcurrentPosition(position) {
  return -position * sectionHeight;
}

function animateTranslate(elem, prop, from, to, duration) { //prop = translateX, translateY
  return new Promise((resolve) => {
    function animate() {
      const currentTime = Date.now();
      const timesLeft = startTime + duration - currentTime;

      if (timesLeft <= 0) {
        elem.style.transform = `${prop}(${to}px)`;
        resolve();
      } else {
        const progress = 1/duration * (duration - timesLeft);
        const offset = from + (to - from) * progress;
        elem.style.transform = `${prop}(${offset}px)`;
        requestAnimationFrame(animate);
      }
    }

    const startTime = Date.now();
    requestAnimationFrame(animate);
  });
}

navBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isBeingAnimated) {
      isBeingAnimated = true;
      const animatedProp = 'translateY';
      let target = document.querySelector(btn.hash);
      let currentPosition = getcurrentPosition(sectionPosition);
      let targetPosition = -target.offsetTop;

      setActiveItemInNavMenu(targetPosition, sectionHeight);
      animateTranslate(onPageScrollWrapper, animatedProp, currentPosition, targetPosition, onePageScrollAnimationDuration).then(() => {
        isBeingAnimated = false;
      });
    }
  });
});

function setActiveItemInNavMenu(targetPosition, step) {
  let activ = Math.abs(parseInt(targetPosition/step));
  asideNavigation.forEach((btn) => {
    btn.parentNode.classList.remove('navigation__item--active');
  });
  asideNavigation[activ].parentNode.classList.add('navigation__item--active');
  sectionPosition = activ;
};