const express = require('express');
const ProductManager = require('./src/ProductManager.js/index.js');

const app = express();
const productManager = new ProductManager('./products.json');

const routes = require('./routes');

app.use(express.json());
app.use('/', routes);


app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts();
  if (!isNaN(limit)) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

app.get('/products/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productManager.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(3002, () => {
  console.log('Server listening on port 3002');
});
