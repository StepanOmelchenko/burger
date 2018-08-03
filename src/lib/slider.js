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