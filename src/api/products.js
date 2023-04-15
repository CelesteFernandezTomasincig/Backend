const express = require('express');
const router = express.Router();
const ProductManager = require('../manager/ProductManager');

const productManager = new ProductManager('../system/product.json');

// GET all products
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET single product
router.get('/:id', async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// POST new product
router.post('/', async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price) {
    res.status(400).send('Name and price are required');
  } else {
    await productManager.addProduct(product);
    res.send('Product added successfully');
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  const updatedProduct = req.body;
  if (!updatedProduct.name || !updatedProduct.price) {
    res.status(400).send('Name and price are required');
  } else {
    await productManager.updateProduct(parseInt(req.params.id), updatedProduct);
    res.send('Product updated successfully');
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    await productManager.deleteProduct(parseInt(req.params.id));
    res.send('Product deleted successfully');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
