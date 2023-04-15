const express = require('express');
const CartManager = require('../manager/CartManager')

const cartRouter = express.Router();
const cartManager = new CartManager('../system/cart.json');

// Crea un nuevo carrito
cartRouter.post('/', async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating cart');
  }
});

// Obtiene un carrito por ID
cartRouter.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(parseInt(req.params.cid));
    res.json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(404).send('Cart not found');
  }
});

// Agrega un producto a un carrito
cartRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cart = await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid), parseInt(req.body.quantity));
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(404).send('Cart not found');
  }
});

module.exports = cartRouter;

