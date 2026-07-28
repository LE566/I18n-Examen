import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly storageKey = 'products';

  private readonly defaultProducts: Product[] = [
    {
      id: '1',
      name: 'Laptop Pro 15"',
      category: 'Electrónica',
      price: 1299.99,
      stock: 12,
      description: 'Computadora portátil de alto rendimiento con procesador de última generación.',
      status: 'available'
    },
    {
      id: '2',
      name: 'Teclado Mecánico RGB',
      category: 'Accesorios',
      price: 89.50,
      stock: 4,
      description: 'Teclado mecánico con luces RGB personalizables y switches silenciosos.',
      status: 'low_stock'
    },
    {
      id: '3',
      name: 'Monitor UltraWide 34"',
      category: 'Electrónica',
      price: 450.00,
      stock: 0,
      description: 'Monitor curvo alta resolución ideal para productividad y diseño.',
      status: 'out_of_stock'
    },
    {
      id: '4',
      name: 'Silla Ergonómica Pro',
      category: 'Mobiliario',
      price: 249.99,
      stock: 8,
      description: 'Silla ergonómica para oficina con soporte lumbar ajustable.',
      status: 'available'
    }
  ];

  constructor() {
    // Inicializar LocalStorage con los productos por defecto si no existe la clave
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.defaultProducts));
    }
  }

  /**
   * Obtiene todos los productos desde LocalStorage.
   */
  getProducts(): Product[] {
    const productsJson = localStorage.getItem(this.storageKey);
    return productsJson ? JSON.parse(productsJson) : [];
  }

  /**
   * Obtiene un producto específico por su ID.
   */
  getProductById(id: string): Product | undefined {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  }

  /**
   * Guarda un producto (lo crea si no tiene ID, o lo edita si ya tiene ID).
   */
  saveProduct(product: Product): void {
    const products = this.getProducts();
    if (product.id) {
      const index = products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products[index] = { ...product };
      }
    } else {
      const newProduct = {
        ...product,
        id: Date.now().toString()
      };
      products.push(newProduct);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  /**
   * Elimina un producto por su ID.
   */
  deleteProduct(id: string): void {
    const products = this.getProducts();
    const updatedProducts = products.filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedProducts));
  }
}
