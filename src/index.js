const ProductManager = require('./ProductManager');
const pm = new ProductManager('products.json');

const newProduct = {
  title: 'Producto nuevo',
  description: 'Este es un producto nuevo',
  price: 10,
  thumbnail: 'https://ejemplo.com/imagen.jpg',
  code: 'PN001',
  stock: 100
};

pm.addProduct(newProduct);
