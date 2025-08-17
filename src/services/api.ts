import axios from 'axios';
import { Product, Category, User, Order, CartItem } from '@/types/product';
import { products, categories, testimonials } from '@/data/sampleData';

// Mock API base URL - in production this would be your Spring Boot backend
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock API functions (replace with actual API calls in production)
export class MockAPI {
  // Products
  static async getProducts(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    search?: string;
  }): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    let filteredProducts = [...products];
    
    if (filters?.category) {
      filteredProducts = filteredProducts.filter(p => p.category.slug === filters.category);
    }
    
    if (filters?.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
    }
    
    if (filters?.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
    }
    
    if (filters?.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return filteredProducts;
  }

  static async getProduct(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return products.find(p => p.id === id) || null;
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return products.filter(p => p.featured);
  }

  static async getRelatedProducts(productId: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = products.find(p => p.id === productId);
    if (!product) return [];
    
    return products
      .filter(p => p.id !== productId && p.category.id === product.category.id)
      .slice(0, 4);
  }

  static async searchProducts(query: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const searchLower = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    ).slice(0, 5); // Limit autocomplete results
  }

  // Categories
  static async getCategories(): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return categories;
  }

  // Cart (using localStorage for persistence)
  static async getCart(): Promise<CartItem[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cart = localStorage.getItem('ethereal-cart');
    return cart ? JSON.parse(cart) : [];
  }

  static async addToCart(productId: string, quantity: number = 1): Promise<CartItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = products.find(p => p.id === productId);
    if (!product) throw new Error('Product not found');

    const cart = await this.getCart();
    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    localStorage.setItem('ethereal-cart', JSON.stringify(cart));
    return cart;
  }

  static async updateCartItem(productId: string, quantity: number): Promise<CartItem[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cart = await this.getCart();
    const item = cart.find(item => item.product.id === productId);
    
    if (item) {
      item.quantity = quantity;
      localStorage.setItem('ethereal-cart', JSON.stringify(cart));
    }
    
    return cart;
  }

  static async removeFromCart(productId: string): Promise<CartItem[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cart = await this.getCart();
    const filteredCart = cart.filter(item => item.product.id !== productId);
    localStorage.setItem('ethereal-cart', JSON.stringify(filteredCart));
    return filteredCart;
  }

  // Auth (mock implementation)
  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication
    if (email === 'admin@etherealcart.com' && password === 'admin123') {
      const user: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@etherealcart.com',
        role: 'admin'
      };
      const token = 'mock-admin-token';
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { user, token };
    } else if (email && password) {
      const user: User = {
        id: '2',
        name: email.split('@')[0],
        email,
        role: 'user'
      };
      const token = 'mock-user-token';
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { user, token };
    }
    
    throw new Error('Invalid credentials');
  }

  static async signup(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user'
    };
    const token = 'mock-user-token';
    
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user, token };
  }

  static async logout(): Promise<void> {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
  }

  // Testimonials
  static async getTestimonials(): Promise<typeof testimonials> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return testimonials;
  }
}

export default MockAPI;