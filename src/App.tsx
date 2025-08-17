import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToast } from "react-hot-toast";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import CartPage from "@/pages/CartPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import AboutPage from "@/pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Enhanced Dynamic Background with 3D Effects
const DynamicBackground = () => {
  const { scrollY } = useScroll();
  
  // Transform scroll position to 3D background effects with moderate speed
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 150]);
  const backgroundRotateX = useTransform(scrollY, [0, 1000], [0, 15]);
  const backgroundRotateY = useTransform(scrollY, [0, 1000], [0, 12]);
  const backgroundScale = useTransform(scrollY, [0, 1000], [1, 1.08]);
  
  // Create scroll-based position for gradient centers
  const gradientCenterX = useTransform(scrollY, [0, 1000], [25, 75]);
  const gradientCenterY = useTransform(scrollY, [0, 1000], [35, 65]);
  const secondaryGradientX = useTransform(scrollY, [0, 1000], [75, 25]);
  const secondaryGradientY = useTransform(scrollY, [0, 1000], [65, 35]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 3D Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 opacity-50"
        style={{
          y: backgroundY,
          rotateX: backgroundRotateX,
          rotateY: backgroundRotateY,
          scale: backgroundScale,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${gradientCenterX}% ${gradientCenterY}%, 
                hsl(248 100% 70% / 0.5) 0%, 
                transparent 50%),
              radial-gradient(circle at ${secondaryGradientX}% ${secondaryGradientY}%, 
                hsl(280 100% 75% / 0.4) 0%, 
                transparent 50%),
              radial-gradient(circle at ${gradientCenterX * 0.7}% ${gradientCenterY * 0.7}%, 
                hsl(248 100% 60% / 0.3) 0%, 
                transparent 70%),
              linear-gradient(135deg, 
                hsl(248 100% 70% / 0.2) 0%, 
                hsl(280 100% 75% / 0.15) 50%, 
                hsl(248 100% 70% / 0.1) 100%)
            `,
          }}
        />
      </motion.div>
      
      {/* 3D Animated Orbs with Depth */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(248 100% 70% / 0.3) 0%, transparent 70%)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -60, 0],
          z: [0, 100, 0],
          scale: [1, 1.2, 1],
          rotateX: [0, 20, 0],
          rotateY: [0, 25, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(280 100% 75% / 0.25) 0%, transparent 70%)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 70, 0],
          z: [0, -80, 0],
          scale: [1, 0.8, 1],
          rotateX: [0, -20, 0],
          rotateY: [0, -15, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />

      {/* 3D Floating Particles with Depth */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsl(${248 + Math.random() * 32} 100% 70% / 0.6)`,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 80 - 40, 0],
            z: [0, Math.random() * 150 - 75, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotateX: [0, 360, 0],
            rotateY: [0, 360, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            delay: Math.random() * 15,
          }}
        />
      ))}

      {/* 3D Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 60 + 20}px`,
            height: `${Math.random() * 60 + 20}px`,
            background: `hsl(${248 + Math.random() * 32} 100% 70% / 0.1)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '20%',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 60 - 30, 0],
            z: [0, Math.random() * 120 - 60, 0],
            rotateX: [0, 360, 0],
            rotateY: [0, 360, 0],
            rotateZ: [0, 180, 0],
            scale: [0.5, 1.3, 0.5],
          }}
          transition={{
            duration: Math.random() * 25 + 25,
            repeat: Infinity,
            delay: Math.random() * 20,
          }}
        />
      ))}

      {/* 3D Grid Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`grid-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{
              top: `${(i / 20) * 100}%`,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`grid-v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            style={{
              left: `${(i / 20) * 100}%`,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2 + 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HotToast 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--glass))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--glass-border))',
              backdropFilter: 'blur(16px)',
            },
          }}
        />
        <BrowserRouter>
          <div className="min-h-screen relative">
            <DynamicBackground />
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;