const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

// Cria um array com os products
function productAll(element) {
  return element.map((elem) => ({ 
    sku: elem.id, 
    name: elem.title, 
    image: elem.thumbnail,
   }));
}

// Adiciona os produtos na página
function addElement(add) {
  const items = document.querySelector('.items');
  items.appendChild(add);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  // const ol = document.querySelector('.cart__items');
  // ol.remove(event);
  event.target.parentNode.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  const ol = document.querySelector('.cart__items');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  ol.appendChild(li);
  return li;
}

const buttonAdd = () => {
  const API = 'https://api.mercadolibre.com/items/MLB1341706310';
  fetch(API)
    .then((json) => json.json())
    .then((e) => createCartItemElement({ 
      sku: e.id,
      name: e.title,
      salePrice: e.price,
     }));
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', buttonAdd);
  }
  return e;
}

// Cria os produtos
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// Requisito 2
// function test() {
//   const elementos = document.getElementsByClassName('item__add');
//   for (let index = 0; index < elementos; index += 1) {
//     console.log("Sage");
//   }
//   // elementos.forEach((element) => element.addEventListener('click',));
// }
// test();

// Requisito 1
function products(api) {
  return fetch(api)
    .then((obj) => obj.json())
    .then((json) => json.results)
    .then((newPr) => productAll(newPr))
    .then((product) => product.forEach((obj) => 
    addElement(createProductItemElement(obj))));
}

window.onload = () => {
  products(URL);
 };
