import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Globe, Heart, Sparkles, Shield, Truck, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Luna Celestine',
      role: 'Founder & CEO',
      image: '/api/placeholder/300/300?text=LC',
      bio: 'Visionary leader with 15+ years in luxury e-commerce, passionate about creating ethereal shopping experiences that transcend the ordinary.'
    },
    {
      name: 'Orion Sage',
      role: 'Head of Product',
      image: '/api/placeholder/300/300?text=OS',
      bio: 'Product innovator specializing in cutting-edge technology and user experience design for next-generation commerce platforms.'
    },
    {
      name: 'Aurora Sterling',
      role: 'Creative Director',
      image: '/api/placeholder/300/300?text=AS',
      bio: 'Award-winning designer with expertise in glassmorphic aesthetics and ethereal brand experiences that captivate and inspire.'
    },
    {
      name: 'Phoenix Kumar',
      role: 'Chief Technology Officer',
      image: '/api/placeholder/300/300?text=PK',
      bio: 'Tech visionary building scalable, secure platforms that power magical shopping experiences across multiple dimensions.'
    }
  ];

  const values = [
    {
      icon: Sparkles,
      title: 'Ethereal Excellence',
      description: 'We curate only the most extraordinary products that transcend ordinary expectations and elevate your lifestyle.'
    },
    {
      icon: Heart,
      title: 'Customer Obsession',
      description: 'Every decision we make is centered around creating magical experiences that delight and inspire our customers.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your data and transactions are protected by quantum-level security measures and ethereal encryption protocols.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'We support sustainable practices and work with artisans worldwide to create positive change across dimensions.'
    }
  ];

  const stats = [
    { number: '500K+', label: 'Happy Customers' },
    { number: '50+', label: 'Countries Served' },
    { number: '10K+', label: 'Products Curated' },
    { number: '99.9%', label: 'Satisfaction Rate' }
  ];

  const timeline = [
    {
      year: '2018',
      title: 'The Vision Begins',
      description: 'Luna Celestine envisions a new era of ethereal e-commerce that transcends traditional shopping experiences.'
    },
    {
      year: '2019',
      title: 'First Launch',
      description: 'Ethereal Cart launches with 100 carefully curated products and a revolutionary glassmorphic interface.'
    },
    {
      year: '2021',
      title: 'Global Expansion',
      description: 'We expand to serve customers across 25 countries, partnering with ethereal artisans worldwide.'
    },
    {
      year: '2023',
      title: 'Innovation Milestone',
      description: 'Launch of our AI-powered ethereal recommendation engine and quantum-secure payment system.'
    },
    {
      year: '2024',
      title: 'Present Day',
      description: 'Serving over 500,000 customers with 10,000+ products across multiple ethereal dimensions.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-ethereal">
            About Ethereal Cart
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're not just an e-commerce platform – we're pioneers of ethereal shopping experiences, 
            curating extraordinary products that elevate your lifestyle beyond the ordinary realm.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="glass-card-strong shadow-ethereal">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-6 text-ethereal">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                To bridge the gap between dreams and reality in online shopping by creating immersive, 
                ethereal experiences that connect people with extraordinary products. We believe that 
                shopping should be more than a transaction – it should be a journey of discovery, 
                wonder, and transformation.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <Card className="glass-card hover:shadow-ethereal transition-all duration-500 p-6">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-ethereal">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The ethereal principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card hover:shadow-ethereal transition-all duration-500 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-ethereal rounded-2xl">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-ethereal">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From vision to reality – the ethereal evolution of our platform
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-ethereal" />

            {timeline.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <Card className="glass-card hover:shadow-ethereal transition-all duration-500">
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-gradient-ethereal text-white">
                        {event.year}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-ethereal">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The visionaries behind the ethereal shopping revolution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="glass-card hover:shadow-ethereal transition-all duration-500 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-20 transition-opacity" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <Badge variant="outline" className="mb-4">
                      {member.role}
                    </Badge>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Card className="glass-card-strong shadow-ethereal">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4 text-ethereal">Join Our Ethereal Journey</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Be part of the revolution that's transforming online shopping into an otherworldly experience. 
                Discover treasures beyond your wildest dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/products" className="btn-ethereal inline-flex items-center px-8 py-3 rounded-lg font-medium transition-all">
                  Explore Products
                  <Sparkles className="ml-2 w-5 h-5" />
                </a>
                <a href="/contact" className="btn-liquid inline-flex items-center px-8 py-3 rounded-lg font-medium border border-glass-border transition-all">
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;