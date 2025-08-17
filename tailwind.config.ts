import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					ethereal: 'hsl(var(--primary-ethereal))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					glow: 'hsl(var(--secondary-glow))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
					glass: 'hsl(var(--muted-glass))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					glow: 'hsl(var(--accent-glow))',
				},
				popover: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				glass: {
					DEFAULT: 'hsl(var(--glass))',
					border: 'hsl(var(--glass-border))',
				},
				hover: 'hsl(var(--hover))',
				active: 'hsl(var(--active))',
				success: 'hsl(var(--success))',
				warning: 'hsl(var(--warning))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-ethereal': 'var(--gradient-ethereal)',
				'gradient-liquid': 'var(--gradient-liquid)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
			},
			boxShadow: {
				'glass': 'var(--shadow-glass)',
				'ethereal': 'var(--shadow-ethereal)',
				'liquid': 'var(--shadow-liquid)',
				'glow-primary': 'var(--glow-primary)',
				'glow-accent': 'var(--glow-accent)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			transitionTimingFunction: {
				'ethereal': 'cubic-bezier(0.23, 1, 0.32, 1)',
				'liquid': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-20px) rotate(1deg)' },
					'66%': { transform: 'translateY(-10px) rotate(-1deg)' }
				},
				'pulse-glow': {
					'from': { boxShadow: 'var(--glow-primary)' },
					'to': { boxShadow: 'var(--glow-primary), var(--glow-accent)' }
				},
				'liquid-morph': {
					'0%, 100%': { borderRadius: '1rem 2rem 1rem 2rem' },
					'25%': { borderRadius: '2rem 1rem 2rem 1rem' },
					'50%': { borderRadius: '1rem 1rem 2rem 2rem' },
					'75%': { borderRadius: '2rem 2rem 1rem 1rem' }
				},
				'ethereal-slide': {
					'from': { 
						opacity: '0', 
						transform: 'translateY(30px) scale(0.95)'
					},
					'to': { 
						opacity: '1', 
						transform: 'translateY(0) scale(1)'
					}
				},
				'particle-float': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.6' },
					'25%': { transform: 'translateY(-30px) translateX(10px)', opacity: '1' },
					'50%': { transform: 'translateY(-20px) translateX(-10px)', opacity: '0.8' },
					'75%': { transform: 'translateY(-40px) translateX(5px)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
				'liquid-morph': 'liquid-morph 8s ease-in-out infinite',
				'ethereal-slide': 'ethereal-slide 0.6s ease-out',
				'particle-float': 'particle-float 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
