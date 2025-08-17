import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Grid, 
  List, 
  Star, 
  ShoppingCart,
  SlidersHorizontal,
  Search,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MockAPI } from '@/services/api';
import { Product, Category } from '@/types/product';
import { useAnimatedList } from '@/hooks/use-scroll-animation';
import toast from 'react-hot-toast';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const animatedList = useAnimatedList(0.08);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [searchParams, selectedCategory, priceRange, inStockOnly, sortBy]);

  const loadCategories = async () => {
    try {
      const categoriesData = await MockAPI.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const filters = {
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchQuery || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        inStock: inStockOnly || undefined,
      };

      let productsData = await MockAPI.getProducts(filters);

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          productsData.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          productsData.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          productsData.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Assuming newer products have higher IDs
          productsData.sort((a, b) => parseInt(b.id) - parseInt(a.id));
          break;
        default:
          // Featured products first
          productsData.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }

      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await MockAPI.addToCart(productId, 1);
      toast.success('Added to cart!', {
        icon: '🛒',
        style: {
          background: 'var(--glass)',
          color: 'var(--foreground)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(16px)',
        },
      });
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 500]);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium mb-2">Search</label>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleFilterChange()}
            className="glass-card border-glass-border pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="glass-card border-glass-border">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="glass-card-strong border-glass-border">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500}
          step={10}
          className="w-full"
        />
      </div>

      {/* In Stock Only */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={(checked) => setInStockOnly(checked === true)}
        />
        <label htmlFor="in-stock" className="text-sm font-medium">
          In Stock Only
        </label>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full btn-liquid">
        <X className="w-4 h-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`glass-card hover:shadow-ethereal transition-all duration-500 group h-full ${
        viewMode === 'list' ? 'flex' : ''
      }`}>
        <div className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-64'
        }`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {product.originalPrice && (
            <Badge className="absolute top-4 left-4 bg-destructive">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
          {!product.inStock && (
            <Badge className="absolute top-4 right-4 bg-gray-500">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <CardContent className={`p-6 flex flex-col ${viewMode === 'list' ? 'flex-1' : ''}`}>
          <div className="flex items-center mb-2">
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
            <span className="text-sm text-muted-foreground ml-2">
              ({product.reviewCount})
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <p className="text-muted-foreground mb-4 flex-grow">
            {viewMode === 'list' 
              ? product.description 
              : product.description.substring(0, 100) + '...'
            }
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Link to={`/product/${product.id}`}>
                <Button variant="outline" size="sm" className="btn-liquid">
                  View
                </Button>
              </Link>
              <Button 
                size="sm" 
                className="btn-ethereal"
                onClick={() => handleAddToCart(product.id)}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-ethereal">
            {selectedCategory && selectedCategory !== 'all'
              ? `${categories.find(c => c.slug === selectedCategory)?.name || 'Category'} Products`
              : searchQuery 
                ? `Search Results for "${searchQuery}"`
                : 'All Products'
            }
          </h1>
          <p className="text-muted-foreground">
            Discover {products.length} ethereal treasures waiting for you
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="btn-liquid lg:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="glass-card-strong w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your search to find the perfect products
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-glass-border rounded-lg p-1 glass-card">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'btn-ethereal' : 'btn-liquid'}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'btn-ethereal' : 'btn-liquid'}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 glass-card border-glass-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card-strong border-glass-border">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="glass-card p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <FilterPanel />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              {products.length > 0 ? (
                <motion.div
                  ref={animatedList.containerRef}
                  variants={animatedList.containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  layout
                  className={`grid gap-6 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  }`}
                >
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={animatedList.itemVariants}
                      whileHover="hover"
                      layout
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <h3 className="text-2xl font-semibold mb-4">No products found</h3>
                  <p className="text-muted-foreground mb-8">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters} className="btn-ethereal">
                    Clear All Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;