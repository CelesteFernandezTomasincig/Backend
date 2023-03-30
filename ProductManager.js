const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProducts();
    product.id = products.length + 1;
    products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(products));
  }

  getProducts() {
    if (!fs.existsSync(this.path)) {
      return [];
    }
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data);
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find((product) => product.id === id);
  }

  updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = { ...updatedProduct, id };
      fs.writeFileSync(this.path, JSON.stringify(products));
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const updatedProducts = products.filter((product) => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(updatedProducts));
  }
}

const productManager = new ProductManager('./products.json');

console.log(productManager.getProducts());


