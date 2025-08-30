import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MockAPI } from '@/services/api';
import { Product, Category, Testimonial } from '@/types/product';
import { useAnimatedList } from '@/hooks/use-scroll-animation';
import heroBackground from '@/assets/hero-bg.jpg';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData, testimonialsData] = await Promise.all([
          MockAPI.getFeaturedProducts(),
          MockAPI.getCategories(),
          MockAPI.getTestimonials(),
        ]);
        
        setFeaturedProducts(productsData);
        setCategories(categoriesData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const animatedList = useAnimatedList(0.1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="Ethereal shopping background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover Ethereal
            <motion.span
              className="block text-ethereal bg-gradient-hero bg-clip-text text-transparent"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Treasures
            </motion.span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Shop Beyond the Ordinary. Experience curated collections that transcend the mundane and elevate your lifestyle to ethereal heights.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/products">
              <Button size="lg" className="btn-ethereal text-lg px-8 py-6 group">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="btn-liquid text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={animatedList.containerRef}
            variants={animatedList.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={animatedList.itemVariants} className="text-4xl md:text-5xl font-bold mb-4 text-ethereal">
              Featured Treasures
            </motion.h2>
            <motion.p variants={animatedList.itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked collection of extraordinary products that embody ethereal beauty and exceptional quality.
            </motion.p>
          </motion.div>

          <motion.div
            ref={animatedList.containerRef}
            variants={animatedList.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {featuredProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                variants={animatedList.itemVariants}
                whileHover="hover"
              >
                <Card className="glass-card hover:shadow-ethereal transition-all duration-500 group overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-4 left-4 bg-destructive">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({product.reviewCount})
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {product.description.substring(0, 80) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <Button className="btn-ethereal text-sm px-3 py-2">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <Button size="lg" variant="outline" className="btn-liquid">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={animatedList.containerRef}
            variants={animatedList.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={animatedList.itemVariants} className="text-4xl md:text-5xl font-bold mb-4 text-ethereal">
              Explore Categories
            </motion.h2>
            <motion.p variants={animatedList.itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive into our carefully curated categories, each offering unique treasures waiting to be discovered.
            </motion.p>
          </motion.div>

          <motion.div
            ref={animatedList.containerRef}
            variants={animatedList.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {categories.map((category, index) => (
              <motion.div 
                key={category.id} 
                variants={animatedList.itemVariants}
                whileHover="hover"
              >
                <Link to={`/products?category=${category.slug}`}>
                  <Card className="glass-card hover:shadow-ethereal transition-all duration-500 group h-full">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-20 transition-opacity" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={animatedList.containerRef}
            variants={animatedList.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={animatedList.itemVariants} className="text-4xl md:text-5xl font-bold mb-4 text-ethereal">
              Why Choose Ethereal Cart
            </motion.h2>
            <motion.p variants={animatedList.itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience shopping like never before with our commitment to excellence and otherworldly customer service.
            </motion.p>
          </motion.div>

          <motion.div
            ref={animatedList.containerRef}
            variants={animatedList.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Truck,
                title: 'Ethereal Delivery',
                description: 'Lightning-fast shipping that arrives before you expect it, like magic in 2-3 days.'
              },
              {
                icon: Shield,
                title: 'Secure Payments',
                description: 'Your transactions are protected by quantum-level encryption and celestial security.'
              },
              {
                icon: Award,
                title: 'Premium Quality',
                description: 'Every product is handpicked and blessed by our quality assurance ethereal beings.'
              },
              {
                icon: Users,
                title: '24/7 Support',
                description: 'Our customer service team is always available across all dimensions and time zones.'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                variants={animatedList.itemVariants}
                whileHover="hover"
              >
                <Card className="glass-card text-center h-full p-8 hover:shadow-ethereal transition-all duration-500">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-block p-4 bg-gradient-ethereal rounded-2xl mb-6"
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={animatedList.containerRef}
            variants={animatedList.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={animatedList.itemVariants} className="text-4xl md:text-5xl font-bold mb-4 text-ethereal">
              Customer Stories
            </motion.h2>
            <motion.p variants={animatedList.itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from our community of satisfied customers who have experienced the magic of Ethereal Cart.
            </motion.p>
          </motion.div>

          <motion.div
            ref={animatedList.containerRef}
            variants={animatedList.containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <motion.div 
                key={testimonial.id} 
                variants={animatedList.itemVariants}
                whileHover="hover"
              >
                <Card className="glass-card h-full p-6 hover:shadow-ethereal transition-all duration-500">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  {testimonial.product && (
                    <Badge variant="outline" className="text-xs">
                      {testimonial.product}
                    </Badge>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card max-w-4xl mx-auto p-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-4 text-ethereal">Join the Ethereal Journey</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to discover new arrivals, exclusive offers, and ethereal experiences.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your ethereal email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 glass-card border-glass-border"
              />
              <Button type="submit" className="btn-ethereal px-8">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;