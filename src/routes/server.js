const express = require('express');
const ProductManager = require('../manager/ProductManager');

const app = express();
app.use(express.json());

// Crear un nuevo ProductManager y especificar la ruta al archivo JSON
const productManager = new ProductManager('../json/products.json');

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
    res.status(404).send('Producto no encontrado');
  }
});

// Agregar un nuevo producto
productsRouter.post('/', async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    res.status(400).send('Los campos nombre, precio e imagen son obligatorios');
  } else {
    try {
      await productManager.addProduct(product);
      res.send('Producto agregado exitosamente');
    } catch (error) {
      res.status(500).send('Error al agregar el producto');
    }
  }
});

// Actualizar un producto existente por ID
productsRouter.put('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const updatedProduct = req.body;
  if (Object.keys(updatedProduct).length === 0) {
    // Si no se envió nada en el body, eliminar todos los campos del producto
    try {
      await productManager.deleteProductFields(id);
      res.send('Producto actualizado exitosamente');
    } catch (error) {
      res.status(500).send('Error al actualizar el producto');
    }
  } else {
    try {
      await productManager.updateProduct(id, updatedProduct);
      res.send('Producto actualizado exitosamente');
    } catch (error) {
      res.status(500).send('Error al actualizar el producto');
    }
  }
});

// Eliminar un producto existente por ID
productsRouter.delete('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  try {
    await productManager.deleteProduct(id);
    res.send('Producto eliminado exitosamente');
  } catch (error) {
    res.status(500).send('Error al eliminar el producto');
  }
});

app.use('/api/products', productsRouter);

// Rutas para manejo de carritos
const cartsRouter = express.Router();
app.use('/api/carts', cartsRouter);

// Iniciar el servidor en el puerto 8080
const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
