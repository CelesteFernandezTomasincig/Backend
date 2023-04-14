const fs = require('fs').promises;

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async createCart() {
    const cart = { id: Date.now(), products: [] };
    await fs.writeFile(this.path, JSON.stringify(cart));
    return cart;
  }

  async getCartById(id) {
    const data = await fs.readFile(this.path, 'utf-8');
    const cart = JSON.parse(data);
    if (cart.id === id) {
      return cart;
    } else {
      throw new Error(`Cart with ID ${id} not found`);
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const data = await fs.readFile(this.path, 'utf-8');
    const cart = JSON.parse(data);
    if (cart.id === cartId) {
      const existingProductIndex = cart.products.findIndex((p) => p.id === productId);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }
      await fs.writeFile(this.path, JSON.stringify(cart));
      return cart;
    } else {
      throw new Error(`Cart with ID ${cartId} not found`);
    }
  }
}

module.exports = CartManager;
  