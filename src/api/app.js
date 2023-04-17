const express = require('express');
const productsRouter = require('./routers/products');
const cartsRouter = require('./routers/carts');

const app = express();
const PORT = 8080;

// Configuración de la aplicación
app.use(express.json());

// Rutas de la aplicación
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
