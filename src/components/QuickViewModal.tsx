import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';

interface QuickViewModalProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Images */}
      <div className="space-y-4">
        <div className="aspect-square rounded-lg overflow-hidden glass-card">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden glass-card border-2 transition-colors ${
                selectedImage === index ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.originalPrice && (
              <Badge className="bg-destructive">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium">Category: </span>
            <Badge variant="outline">{product.category.name}</Badge>
          </div>
          
          <div>
            <span className="text-sm font-medium">Tags: </span>
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="mr-2 mb-1">
                {tag}
              </Badge>
            ))}
          </div>

          <div>
            <span className="text-sm font-medium">Stock Status: </span>
            <Badge variant={product.inStock ? 'default' : 'destructive'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center glass-card border border-glass-border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 text-center min-w-12">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                className="p-2"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className="btn-ethereal flex-1"
              onClick={() => onAddToCart(product.id, quantity)}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" className="btn-liquid p-3">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;