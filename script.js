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
  }
  const productManager = new ProductManager();

  // Agregamos el primer producto
  productManager.addProduct("Producto 1", "Descripción del producto 1", 10.99, "ruta-imagen-1.jpg", "COD001", 50);
  
  // Agregamos el segundo producto
  productManager.addProduct("Producto 2", "Descripción del producto 2", 25.99, "ruta-imagen-2.jpg", "COD002", 25);
  
  // Agregamos el tercer producto
  productManager.addProduct("Producto 3", "Descripción del producto 3", 5.99, "ruta-imagen-3.jpg", "COD003", 100);
  
  // Agregamos el cuarto producto
  productManager.addProduct("Producto 4", "Descripción del producto 4", 50.99, "ruta-imagen-4.jpg", "COD004", 10);
  console.log(productManager.getProducts());