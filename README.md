# SnappyCart Demo

> A professional e-commerce demo application built with Next.js and SnappyCart, featuring enterprise-grade security, UK localization, and a modern UI.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 Overview

This is a complete professional e-commerce demo showcasing a modern shopping cart implementation with enterprise-grade security features. Built with Next.js, React, and TypeScript, it provides a production-ready foundation for e-commerce applications.

## ✨ Key Features

### 🛒 E-Commerce Functionality
- **Full Shopping Cart** - Add, remove, and update items with real-time calculations
- **Multi-Step Checkout** - Professional checkout flow (Shipping → Payment → Review)
- **Order Management** - Order confirmation with tracking numbers
- **Product Catalog** - 18 professional products across 5 categories
- **Search & Filtering** - Search products by name, brand, or category
- **Category Navigation** - Filter products by category with professional icons

### 🇬🇧 UK Localization
- **UK Currency (£)** - Proper GBP formatting throughout
- **UK Postcode Validation** - Comprehensive UK postcode format checking
- **UK Phone Validation** - UK phone number format validation
- **20% VAT** - Automatic VAT calculation
- **County Field** - UK-specific address fields

### 🎨 Professional Design
- **Modern UI/UX** - Clean, professional slate color scheme
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **SVG Icons** - Professional icon system (no emojis)
- **Smooth Animations** - Polished transitions and interactions
- **Accessibility** - ARIA labels and keyboard navigation support

### 🔒 Enterprise Security
- **XSS Protection** - Comprehensive input sanitization
- **SQL Injection Prevention** - Input validation and sanitization
- **CSRF Protection** - Content Security Policy headers
- **Rate Limiting** - DoS protection (100 requests/minute)
- **Input Validation** - Credit card (Luhn algorithm), email, phone, postcode
- **Security Headers** - X-Frame-Options, CSP, HSTS, and more
- **Type Safety** - Full TypeScript implementation

## 📸 Screenshots

### Product Catalog
Browse 18 professional products with search and category filtering.

### Shopping Cart
Full-featured cart with quantity management and real-time totals.

### Checkout Flow
Multi-step checkout with comprehensive validation and security.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20 or higher
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/alam-cloud/snappycart.git
cd snappycart

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build the application
npm run build

# The static files will be in the 'out' directory
```

## 📁 Project Structure

```
snappycart-demo/
├── app/
│   ├── components/          # React components
│   │   ├── CartContext.tsx  # Cart state management
│   │   ├── CartDrawer.tsx   # Cart drawer UI
│   │   ├── Checkout.tsx     # Checkout flow
│   │   ├── ProductCard.tsx  # Product display
│   │   └── ...
│   ├── data/               # Data files
│   │   └── products.ts     # Product catalog
│   ├── utils/              # Utility functions
│   │   ├── security.ts     # Security utilities
│   │   ├── validation.ts   # Form validation
│   │   └── currency.ts     # Currency formatting
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies
└── README.md              # This file
```

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16.1.3
- **React**: 19.2.3
- **Cart Library**: [SnappyCart](https://github.com/idncod/snappycart) 1.1.0
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4
- **Type Safety**: TypeScript 5
- **Deployment**: GitHub Pages with GitHub Actions

## 🔒 Security Features

This application implements enterprise-grade security measures:

- **Input Sanitization** - All user inputs are sanitized to prevent XSS
- **Content Security Policy (CSP)** - Restricts resource loading
- **Rate Limiting** - Prevents DoS attacks
- **Input Validation** - Comprehensive validation for all form fields
- **Security Headers** - Multiple security headers for protection
- **Credit Card Validation** - Luhn algorithm verification

For detailed security documentation, see [SECURITY.md](SECURITY.md).

## 🌐 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

#### Setup Steps:

1. **Fork/Clone** the repository
2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"
3. **Configure Base Path** (if needed):
   - Update `.github/workflows/deploy.yml`
   - Set `NEXT_PUBLIC_BASE_PATH` to match your repository name
4. **Deploy**: Push to `main` branch and GitHub Actions will automatically deploy

### Manual Deployment

```bash
npm run build
# Upload the 'out' directory to your hosting provider
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server (requires build) |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [SnappyCart](https://github.com/idncod/snappycart) - Shopping cart library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Geist Font](https://vercel.com/font) - Font family by Vercel

## 📚 Documentation

- [Security Documentation](SECURITY.md) - Comprehensive security guide
- [SnappyCart Repository](https://github.com/idncod/snappycart) - Original SnappyCart package

## 🐛 Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/alam-cloud/snappycart/issues).

---

**Built with ❤️ using Next.js, React, and SnappyCart**
