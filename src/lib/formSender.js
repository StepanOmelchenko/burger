// form sender
const formSectionOne = document.querySelector('#form-sectionone');
const formTextarea = document.querySelector('#form-textarea');
const orderForm = document.querySelector('#order-form');
const orderSection = document.querySelector('#order-section');

var orderOverlay = document.createElement('div');
    orderOverlay.innerHTML = document.querySelector('#order-overlay').innerHTML;
    orderOverlay.classList.add('overlay');
    orderOverlay.classList.add('overlay--rewievs');
var orderCloseBtn = orderOverlay.querySelector('#order-close-btn');

formTextarea.addEventListener('focus', (e) => {
  let orderFormParams = orderForm.getBoundingClientRect();
  
  if (orderFormParams.width <= 480) {
    formSectionOne.classList.add('form__column--hide');
    orderSection.classList.add('seventh--textarea');
  }
});

formTextarea.addEventListener('focusout', (e) => {
  formSectionOne.classList.remove('form__column--hide');
  orderSection.classList.remove('seventh--textarea');
});

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

