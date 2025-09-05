import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { Link } from 'react-router-dom';

interface MiniCartProps {
  isVisible: boolean;
  onClose: () => void;
  items: { product: Product; quantity: number }[];
}

const MiniCart: React.FC<MiniCartProps> = ({ isVisible, onClose, items }) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="fixed top-24 right-4 w-80 glass-card-strong border border-glass-border rounded-lg shadow-ethereal z-50 p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Cart Updated</h3>
              <Badge variant="secondary">{itemCount}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.slice(-3).map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} × ${item.product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-glass-border mt-4 pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-primary">${total.toFixed(2)}</span>
            </div>
            
            <div className="flex gap-2">
              <Link to="/cart" className="flex-1">
                <Button variant="outline" className="btn-liquid w-full">
                  View Cart
                </Button>
              </Link>
              <Button className="btn-ethereal flex-1">
                Checkout <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;