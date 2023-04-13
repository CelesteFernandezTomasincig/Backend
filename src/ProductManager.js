const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const products = await this.getProducts();
    product.id = products.length + 1;
    products.push(product);
    await fs.writeFile(this.path, JSON.stringify(products));
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((product) => product.id === id);
  }

  async updateProduct(id, updatedProduct) {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = { ...updatedProduct, id };
      await fs.writeFile(this.path, JSON.stringify(products));
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const updatedProducts = products.filter((product) => product.id !== id);
    if (updatedProducts.length === products.length) {
      throw new Error(`Product with ID ${id} not found`);
    }
    await fs.writeFile(this.path, JSON.stringify(updatedProducts));
  }
}

module.exports = ProductManager;


