class ProductManager {
  constructor() {
    this.products = []; // arreglo vacío para almacenar los productos
    this.lastId = 0; // inicializamos el id autoincrementable
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Verificamos que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Verificamos que el campo "code" no se repita en otros productos
    const productExists = this.products.some(product => product.code === code);
    if (productExists) {
      throw new Error("El código del producto ya existe.");
    }

    // Creamos el objeto "product" con los datos proporcionados y el id autoincrementable
    const product = {
      id: ++this.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    // Agregamos el objeto "product" al arreglo "products"
    this.products.push(product);
  }

  removeProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  findProductById(id) {
    return this.products.find(product => product.id === id);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.findProductById(id);
    if (!product) {
      console.error("Not found");
    }
    return product;
  }

  updateProduct(id, fieldToUpdate) {
    const product = this.findProductById(id);
    if (!product) {
      console.error("Not found");
      return;
    }
    Object.assign(product, fieldToUpdate);
  }

  deleteProduct(id) {
    this.removeProduct(id);
  }
}

const productManager = new ProductManager();

// Agregamos el primer producto
productManager.addProduct("Zapatilla", "Zapatillas talle 37", 10.99, "img-1", "COD001", 50);

// Agregamos el segundo producto
productManager.addProduct("Reloj", "Reloj Rolex", 25.99, "img-2", "COD002", 25);

// Agregamos el tercer producto
productManager.addProduct("Campera", "Campera de cuero", 5.99, "img-3", "COD003", 100);

// Agregamos el cuarto producto
productManager.addProduct("Camisa", "Camisa de Zara", 50.99, "img-4", "COD004", 10);

console.log(productManager.getProducts());

// Actualizar el segundo producto
productManager.updateProduct(2, {
  price: 30.99,
  stock: 20
});

console.log(productManager.getProducts());

// Eliminar el tercer producto
productManager.deleteProduct(3);

console.log(productManager.getProducts());
