import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MockAPI } from '@/services/api';
import { CartItem } from '@/types/product';
import toast from 'react-hot-toast';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const items = await MockAPI.getCart();
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdating(productId);
    try {
      const updatedCart = await MockAPI.updateCartItem(productId, newQuantity);
      setCartItems(updatedCart);
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update cart');
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (productId: string) => {
    setUpdating(productId);
    try {
      const updatedCart = await MockAPI.removeFromCart(productId);
      setCartItems(updatedCart);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    } finally {
      setUpdating(null);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container mx-auto max-w-4xl text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12"
          >
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-4xl font-bold mb-4 text-ethereal">Your Cart is Empty</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover ethereal treasures waiting to fill your cart
            </p>
            <Link to="/products">
              <Button size="lg" className="btn-ethereal">
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-ethereal">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your ethereal collection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="glass-card mb-4 hover:shadow-ethereal transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {!item.product.inStock && (
                            <Badge className="absolute top-2 right-2 bg-destructive text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-2">
                                <Link 
                                  to={`/product/${item.product.id}`}
                                  className="hover:text-primary transition-colors"
                                >
                                  {item.product.name}
                                </Link>
                              </h3>
                              <p className="text-muted-foreground mb-4 line-clamp-2">
                                {item.product.description}
                              </p>
                              <div className="flex items-center space-x-4">
                                <span className="text-2xl font-bold text-primary">
                                  ${item.product.price}
                                </span>
                                {item.product.originalPrice && (
                                  <span className="text-lg text-muted-foreground line-through">
                                    ${item.product.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Quantity Controls & Remove */}
                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start mt-4 sm:mt-0 space-y-0 sm:space-y-4">
                              <div className="flex items-center space-x-2 glass-card border border-glass-border rounded-lg p-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1 || updating === item.product.id}
                                  className="w-8 h-8 p-0 btn-liquid"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">
                                  {updating === item.product.id ? '...' : item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  disabled={updating === item.product.id}
                                  className="w-8 h-8 p-0 btn-liquid"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.product.id)}
                                disabled={updating === item.product.id}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 btn-liquid"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="glass-card sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-ethereal">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                    
                    {subtotal < 100 && (
                      <div className="text-sm text-muted-foreground bg-accent/20 p-3 rounded-lg">
                        Add <span className="font-medium text-primary">${(100 - subtotal).toFixed(2)}</span> more for free shipping!
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <Link to="/checkout">
                      <Button size="lg" className="w-full btn-ethereal text-lg py-6">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    
                    <Link to="/products">
                      <Button variant="outline" size="lg" className="w-full btn-liquid">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Security Badge */}
                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span>Secure checkout with ethereal encryption</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;