const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
const ol = document.querySelector('.cart__items');
const totalDiv = document.querySelector('.total-price');
const buttonRemove = document.querySelector('.empty-cart');

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
const cartPrices = [];
const cartItems = [];

// Função para incrementar preço
function totalPrice() {
  let sum = 0;
  cartPrices.forEach((e) => { sum += e; });
  totalDiv.innerText = sum;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  // Ler sobre o acesso dos elementos em DOM/Apagar
  const text = event.target.innerText;
  cartItems.forEach((e, i) => {
    if (e === text) {
      cartPrices[i] = 0;
    }
  });
  totalPrice();
  event.target.parentNode.removeChild(event.target);
  localStorage.setItem('listPcs', ol.innerHTML);
}

// Adiciona função apagar aos items da lista
ol.addEventListener('click', cartItemClickListener);
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  ol.appendChild(li);
  localStorage.setItem('listPcs', ol.innerHTML);
  // 
  cartItems.push(li.innerText);
  cartPrices.push(salePrice);
  totalPrice();
  return li;
}

// Adiciona no HTML os itens salvos no Storage
function rechargeItems() {
  const list = localStorage.getItem('listPcs');
  ol.innerHTML = list;
}

const buttonAdd = (event) => {
  // Pesquisar sobre o parentNode e as formas de percorrer os filhos
  const id = event.target.parentNode.firstChild.innerText;
  const API = `https://api.mercadolibre.com/items/${id}`;
  fetch(API)
    .then((data) => data.json())
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
  // Adiciona um evento aos botões dos produtos
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
  section.appendChild(createCustomElement('button', 'item__add', 'Comprar'));

  return section;
}

// // Requisito 6
// // Função que apaga todos os itens
buttonRemove.addEventListener('click', () => {
  ol.innerHTML = '';
  totalDiv.innerText = 0;
});

const loading = document.querySelector('.loading');
// Requisito 1
 function products(api) {
  // workaround
  setTimeout(() => {
    loading.remove();
  }, 2000);
  setTimeout(() => {
    fetch(api)
      .then((obj) => obj.json())
      .then((json) => json.results)
      .then((newPr) => productAll(newPr))
      .then((product) => product.forEach((obj) => 
      addElement(createProductItemElement(obj))));
  }, 2100);
}

window.onload = () => {
  products(URL);
  rechargeItems();
 };
