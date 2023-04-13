const express = require('express');
const ProductManager = require('../ProductManager');

const app = express();
app.use(express.json());

// Crear un nuevo ProductManager y especificar la ruta al archivo JSON
const productManager = new ProductManager('./products.json');

// Rutas para manejo de productos
const productsRouter = express.Router();

// Listar todos los productos (con límite opcional)
productsRouter.get('/', async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  res.json(limit ? products.slice(0, limit) : products);
});

// Obtener un producto por ID
productsRouter.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Agregar un nuevo producto
productsRouter.post('/', async (req, res) => {
  const product = req.body;
  try {
    await productManager.addProduct(product);
    res.send('Product added successfully');
  } catch (error) {
    res.status(500).send('Error adding product');
  }
});

// Actualizar un producto existente por ID
productsRouter.put('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const updatedProduct = req.body;
  try {
    await productManager.updateProduct(id, updatedProduct);
    res.send('Product updated successfully');
  } catch (error) {
    res.status(500).send('Error updating product');
  }
});

// Eliminar un producto existente por ID
productsRouter.delete('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  try {
    await productManager.deleteProduct(id);
    res.send('Product deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting product');
  }
});

app.use('/api/products', productsRouter);

// Rutas para manejo de carritos
const cartsRouter = express.Router();
app.use('/api/carts', cartsRouter);

// Iniciar el servidor en el puerto 8080
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));