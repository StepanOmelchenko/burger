
// -hamburger

const body = document.body;
const button = document.querySelector('#hamburger');
const overlay = createOverlay();

body.appendChild(overlay);

button.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.display = 'flex';
});

function createOverlay() {
    let logo = document.querySelector('#logo').cloneNode(true);
    let copiedMenu = document.querySelector('#main-menu .header-menu__list').cloneNode(true);
    let menuLinks = copiedMenu.querySelectorAll('.nav-btn');
    let allElems = copiedMenu.querySelectorAll('*');
    allElems.forEach((elem) => {
        elem.classList = null;
    });
    let overlay = document.createElement('div');
    overlay.innerHTML = document.querySelector('#main-overlay').innerHTML;
    overlay.classList.add('overlay');
    let closeBtn = document.createElement('a');
    closeBtn.classList.add('close-btn');
    closeBtn.href = '#';
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        overlay.style.display = 'none';
    }); 
    copiedMenu.classList.add('overlay__list');

    menuLinks.forEach((link) => {
         link.classList.add('overlay__link');
         link.classList.add('nav-btn');
         link.parentNode.classList.add('overlay__item');
         link.addEventListener('click', function(e) {
             e.preventDefault();
             overlay.style.display = 'none';
         });
    });
    
    overlay.querySelector('header').appendChild(logo);
    overlay.querySelector('header').appendChild(closeBtn);
    overlay.querySelector('nav').appendChild(copiedMenu);    
    return overlay;

}

// - accordions

const teamItems = document.querySelector('#team-menu').querySelectorAll('.fourth__item');
const burgersItems = document.querySelector('#burgers-menu').querySelectorAll('.fifth__link');

createAccordionMenu(teamItems, 'fourth__item--active');
createAccordionMenu(burgersItems, 'fifth__link--active');

function createAccordionMenu(menuList, activeClassList) {
  menuList.forEach((item) => {
    item.addEventListener('click', (e) =>{
      e.preventDefault();
      menuList.forEach((item) => {
         if (e.currentTarget != item) {
          item.classList.remove(activeClassList);
         }
        });
      item.classList.toggle(activeClassList);
      });  
  });
}

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

delayFunc = (function(){
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

// -slider

const slider = document.querySelector('#slider-list');
const sliderItemsNumber = slider.querySelectorAll('li').length - 1;
const sliderItem = slider.querySelector('li');
const sliderLeftBtn = document.querySelector('#slider-left');
const sliderRightBtn = document.querySelector('#slider-right');
var sliderItemHeight = parseInt(getComputedStyle(sliderItem).width);
var sliderCurentPosition = 0;

sliderRightBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    if (!isBeingAnimated) {
        let curentPosition = getSliderCurentPosition(sliderCurentPosition, sliderItemHeight);
        if (sliderCurentPosition < sliderItemsNumber) {
            sliderCurentPosition++;
        } else {
            sliderCurentPosition = 0;
        }  
        sliderAnimationPrepare(slider, curentPosition);
    }
});

sliderLeftBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    if (!isBeingAnimated) {
        let curentPosition = getSliderCurentPosition(sliderCurentPosition, sliderItemHeight);
        if (sliderCurentPosition > 0) {
            sliderCurentPosition--;
        } else {
            sliderCurentPosition = sliderItemsNumber;
        }  
        sliderAnimationPrepare(slider, curentPosition);
    }
});

function getSliderCurentPosition(position, itemHeight) {
    return -1 * position * itemHeight;
}

function sliderAnimationPrepare(slider, curentPosition) {
    const sliderProp = 'translateX';
    const sliderAnimationDuration = 1000;
    let moveTo = getSliderCurentPosition(sliderCurentPosition, sliderItemHeight);
    isBeingAnimated = true;

    animateTranslate(slider, sliderProp, curentPosition, moveTo, sliderAnimationDuration).then(() =>{
        isBeingAnimated = false;
    });
}

// map

ymaps.ready(init);
var myMap;
var coords = [
  [59.961368, 30.288778],
  [59.913992, 30.302168],
  [59.944665, 30.373579],
  [59.931572, 30.435377]
];

function init(){     
  myMap = new ymaps.Map("map", {
    center: [59.941392, 30.293756],
    zoom: 12,
    controls: ['zoomControl']
  });  
  myMap.behaviors.disable('scrollZoom');

  var placemarks = createPlacemarks(coords);

  placemarks.forEach((placemark) => {
    myMap.geoObjects.add(placemark);
  });

  function createPlacemarks(array) {
    let placemarks = [];
  
    array.forEach((coord) => {
      let oneMark = new ymaps.Placemark([coord[0], coord[1]], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/map-marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [0, 0]
      });  
      placemarks.push(oneMark);
    });
  
    return placemarks;
  }
  
}

// form sender

var orderForm = document.querySelector('#order-form');
    orderOverlay = document.createElement('div');
    orderOverlay.innerHTML = document.querySelector('#order-overlay').innerHTML;
    orderOverlay.classList.add('overlay');
    orderOverlay.classList.add('overlay--rewievs');
var orderCloseBtn = orderOverlay.querySelector('#order-close-btn');

orderCloseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  body.removeChild(orderOverlay);
});

orderForm.addEventListener('submit', (e) =>{
  e.preventDefault();
  createReq(orderForm).then(
    (mes) => {
      createOrderModalWindow(body, orderOverlay, mes);
    },
    (error) =>{
      createOrderModalWindow(body, orderOverlay, error);
    }
  );
});

function createReq(form) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest(),
        method = form.method,
        url = form.action,
        data = new FormData(form);

    xhr.open(method, url, true);
    xhr.send(data);
    
    xhr.onerror = (error) =>{
      reject(error);
    }

    xhr.onreadystatechange = () =>{
      if (xhr.readyState != 4) return;
      
      if (xhr.responseText == 'OK') {
        resolve(xhr.responseText);
      }else{
        reject(xhr.responseText);
      }
    }

  });
}

function createOrderModalWindow(parent, child, text) {
  if (!text) {
    text = 'no response';
  }
  child.querySelector('.order-modal__text').innerText = text;
  parent.appendChild(child);
}

