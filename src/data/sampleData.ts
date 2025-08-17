import { Product, Category, Testimonial } from '@/types/product';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Cutting-edge technology that transcends the ordinary',
    image: '/api/placeholder/400/300?text=Electronics'
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Ethereal designs that capture your unique essence',
    image: '/api/placeholder/400/300?text=Fashion'
  },
  {
    id: '3',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Transform your space into an ethereal sanctuary',
    image: '/api/placeholder/400/300?text=Home'
  },
  {
    id: '4',
    name: 'Beauty',
    slug: 'beauty',
    description: 'Radiant products for your inner and outer glow',
    image: '/api/placeholder/400/300?text=Beauty'
  },
  {
    id: '5',
    name: 'Sports',
    slug: 'sports',
    description: 'Elevate your performance to ethereal heights',
    image: '/api/placeholder/400/300?text=Sports'
  },
  {
    id: '6',
    name: 'Books',
    slug: 'books',
    description: 'Stories that transport you to otherworldly realms',
    image: '/api/placeholder/400/300?text=Books'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Ethereal Wireless Headphones',
    description: 'Experience audio like never before with our flagship wireless headphones. Featuring advanced noise cancellation, 40-hour battery life, and crystal-clear ethereal sound quality that transports you to another dimension.',
    price: 299.99,
    originalPrice: 399.99,
    images: ['/api/placeholder/600/600?text=Headphones1', '/api/placeholder/600/600?text=Headphones2'],
    category: categories[0],
    rating: 4.8,
    reviewCount: 2847,
    inStock: true,
    featured: true,
    tags: ['wireless', 'noise-cancelling', 'premium'],
    specifications: {
      'Battery Life': '40 hours',
      'Connectivity': 'Bluetooth 5.3',
      'Weight': '250g',
      'Charging': 'USB-C Fast Charge'
    }
  },
  {
    id: '2',
    name: 'Mystic Silk Dress',
    description: 'Flowing like liquid moonlight, this ethereal silk dress embodies elegance and grace. Crafted from the finest mulberry silk with hand-embroidered celestial patterns that shimmer with every movement.',
    price: 189.99,
    originalPrice: 249.99,
    images: ['/api/placeholder/600/600?text=Dress1', '/api/placeholder/600/600?text=Dress2'],
    category: categories[1],
    rating: 4.9,
    reviewCount: 1523,
    inStock: true,
    featured: true,
    tags: ['silk', 'elegant', 'handmade'],
    specifications: {
      'Material': '100% Mulberry Silk',
      'Care': 'Dry Clean Only',
      'Origin': 'Artisan Crafted',
      'Sizes': 'XS - XL'
    }
  },
  {
    id: '3',
    name: 'Levitating Crystal Lamp',
    description: 'This mystical lamp features a genuine crystal that appears to float above its base using magnetic levitation technology. Creates an ethereal ambiance with customizable LED colors and gentle rotation.',
    price: 149.99,
    images: ['/api/placeholder/600/600?text=Lamp1', '/api/placeholder/600/600?text=Lamp2'],
    category: categories[2],
    rating: 4.7,
    reviewCount: 892,
    inStock: true,
    featured: true,
    tags: ['magnetic', 'LED', 'decoration'],
    specifications: {
      'Power': '12V DC Adapter',
      'Crystal': 'Natural Quartz',
      'Colors': '16 Million RGB',
      'Size': '8" x 8" x 12"'
    }
  },
  {
    id: '4',
    name: 'Ethereal Glow Serum',
    description: 'Unlock your skin\'s natural radiance with our signature glow serum. Infused with rare botanical extracts and bio-luminescent peptides for an otherworldly luminous complexion.',
    price: 89.99,
    images: ['/api/placeholder/600/600?text=Serum1', '/api/placeholder/600/600?text=Serum2'],
    category: categories[3],
    rating: 4.9,
    reviewCount: 3241,
    inStock: true,
    featured: true,
    tags: ['organic', 'anti-aging', 'glow'],
    specifications: {
      'Volume': '30ml',
      'Key Ingredients': 'Hyaluronic Acid, Vitamin C, Niacinamide',
      'Skin Type': 'All Types',
      'Cruelty Free': 'Yes'
    }
  },
  {
    id: '5',
    name: 'Quantum Fitness Tracker',
    description: 'Track your ethereal journey to peak performance with advanced biometric monitoring, meditation guidance, and celestial navigation for outdoor adventures.',
    price: 199.99,
    images: ['/api/placeholder/600/600?text=Tracker1', '/api/placeholder/600/600?text=Tracker2'],
    category: categories[4],
    rating: 4.6,
    reviewCount: 1847,
    inStock: true,
    featured: false,
    tags: ['fitness', 'smartwatch', 'waterproof'],
    specifications: {
      'Battery': '7 days',
      'Water Resistance': '50m',
      'Sensors': 'Heart Rate, GPS, Altimeter',
      'Compatibility': 'iOS & Android'
    }
  },
  {
    id: '6',
    name: 'Chronicles of the Ethereal Realm',
    description: 'A captivating fantasy novel that follows the journey of a young mage discovering hidden dimensions. Beautifully illustrated with ethereal artwork and bound in shimmering material.',
    price: 24.99,
    images: ['/api/placeholder/600/600?text=Book1', '/api/placeholder/600/600?text=Book2'],
    category: categories[5],
    rating: 4.8,
    reviewCount: 756,
    inStock: true,
    featured: false,
    tags: ['fantasy', 'illustrated', 'bestseller'],
    specifications: {
      'Pages': '384',
      'Publisher': 'Ethereal Press',
      'Format': 'Hardcover',
      'Language': 'English'
    }
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '/api/placeholder/80/80?text=SC',
    rating: 5,
    text: 'Ethereal Cart has completely transformed my shopping experience! The quality is unmatched and the ethereal aesthetic makes every purchase feel magical.',
    product: 'Mystic Silk Dress'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: '/api/placeholder/80/80?text=MJ',
    rating: 5,
    text: 'The headphones I bought here are absolutely incredible. The sound quality is otherworldly and the design is simply stunning.',
    product: 'Ethereal Wireless Headphones'
  },
  {
    id: '3',
    name: 'Luna Rodriguez',
    avatar: '/api/placeholder/80/80?text=LR',
    rating: 5,
    text: 'My levitating lamp has become the centerpiece of my living room. Guests are always amazed by its ethereal beauty and craftsmanship.',
    product: 'Levitating Crystal Lamp'
  },
  {
    id: '4',
    name: 'David Park',
    avatar: '/api/placeholder/80/80?text=DP',
    rating: 5,
    text: 'Fast shipping, premium packaging, and products that exceed expectations every time. Ethereal Cart sets the gold standard for online shopping.'
  },
  {
    id: '5',
    name: 'Emma Thompson',
    avatar: '/api/placeholder/80/80?text=ET',
    rating: 5,
    text: 'The glow serum is pure magic in a bottle! My skin has never looked more radiant. I\'m a customer for life.',
    product: 'Ethereal Glow Serum'
  }
];