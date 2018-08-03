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
