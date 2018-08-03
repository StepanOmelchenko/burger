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