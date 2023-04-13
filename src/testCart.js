const CartManager = require('./CartManager');
const cartManager = new CartManager('./cart.json');

(async function() {
  try {
    let cart = await cartManager.createCart();
    console.log('Cart created:', cart);

    cart = await cartManager.getCartById(cart.id);
    console.log('Cart retrieved by ID:', cart);

    const productId = 1;
    cart = await cartManager.addProductToCart(cart.id, productId, 2);
    console.log('Product added to cart:', cart);

  } catch (err) {
    console.error(err);
  }
})();
