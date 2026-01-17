document.addEventListener('DOMContentLoaded', function() {
  const cartProducts = document.querySelector('.cart__products');
  const cartTitle = document.querySelector('.cart__title');
  const cart = document.querySelector('.cart');

  // Инициализация корзины из localStorage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};

  // Функция обновления видимости корзины
  function updateCartVisibility() {
    const hasItems = Object.keys(cartItems).length > 0;
    if (hasItems) {
      cart.style.display = 'block';
    } else {
      cart.style.display = 'none';
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  // Функция рендеринга товаров в корзине
  function renderCart() {
    cartProducts.innerHTML = '';

    for (const productId in cartItems) {
      const product = cartItems[productId];
      const cartProduct = document.createElement('div');
      cartProduct.className = 'cart__product';
      cartProduct.dataset.id = productId;

      const img = document.createElement('img');
      img.className = 'cart__product-image';
      img.src = product.image;

      const count = document.createElement('div');
      count.className = 'cart__product-count';
      count.textContent = product.quantity;

      cartProduct.appendChild(img);
      cartProduct.appendChild(count);
      cartProducts.appendChild(cartProduct);
    }

    updateCartVisibility();
  }

  // Инициализация корзины при загрузке
  renderCart();

  // Обработчик кликов на кнопки увеличения/уменьшения количества
  document.addEventListener('click', function(event) {
    const target = event.target;

    // Обработка кнопок увеличения/уменьшения количества
    if (target.classList.contains('product__quantity-control')) {
      const quantityControls = target.closest('.product__quantity-controls');
      const quantityValue = quantityControls.querySelector('.product__quantity-value');
      let currentValue = parseInt(quantityValue.textContent);

      if (target.classList.contains('product__quantity-control_dec')) {
        if (currentValue > 1) {
          quantityValue.textContent = currentValue - 1;
        }
      } else if (target.classList.contains('product__quantity-control_inc')) {
        quantityValue.textContent = currentValue + 1;
      }
    }

    // Обработка кнопки добавления в корзину
    if (target.classList.contains('product__add')) {
      const product = target.closest('.product');
      const productId = product.dataset.id;
      const productImage = product.querySelector('.product__image').src;
      const quantityValue = parseInt(product.querySelector('.product__quantity-value').textContent);

      const windowWidth = document.documentElement.clientWidth;

      // Анимация добавления товара
      const productImageEl = product.querySelector('.product__image');
      const cartRect = cartProducts.getBoundingClientRect();
      const productRect = productImageEl.getBoundingClientRect();

      const flyingImage = productImageEl.cloneNode(true);
      flyingImage.className = 'product-shadow';
      flyingImage.style.position = 'fixed';
      flyingImage.style.left = productRect.left + 'px';
      flyingImage.style.top = productRect.top + 'px';
      flyingImage.style.width = productRect.width + 'px';
      flyingImage.style.height = productRect.height + 'px';
      flyingImage.style.zIndex = '1000';
      flyingImage.style.transition = 'all 0.5s ease';
      flyingImage.style.pointerEvents = 'none';

      document.body.appendChild(flyingImage);

      setTimeout(() => {
        flyingImage.style.left = cartRect.left + windowWidth / 2 + 'px';
        flyingImage.style.top = cartRect.top + 'px';
        flyingImage.style.opacity = '0.5';
      }, 0);

      setTimeout(() => {
        document.body.removeChild(flyingImage);

        // Добавление товара в корзину
        if (cartItems[productId]) {
          cartItems[productId].quantity += quantityValue;
        } else {
          cartItems[productId] = {
            image: productImage,
            quantity: quantityValue
          };
        }

        renderCart();
      }, 500);

      // Сброс счетчика товара к 1
      product.querySelector('.product__quantity-value').textContent = '1';
    }

    // Обработка удаления товара из корзины (двойной клик)
    if (target.closest('.cart__product')) {
      if (event.detail === 2) { // Двойной клик
        const cartProduct = target.closest('.cart__product');
        const productId = cartProduct.dataset.id;

        delete cartItems[productId];
        renderCart();
      }
    }
  });

  // Добавление стилей для анимации
  const style = document.createElement('style');
  style.textContent = `
    .product-shadow {
      border-radius: 6px;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
  `;
  document.head.appendChild(style);
});