# 🛒 SnappyCart Demo

A modern, secure e-commerce shopping cart demo built with Next.js and SnappyCart. This application demonstrates a fully functional shopping cart with a beautiful, responsive UI and enterprise-grade security features.

## ✨ Features

- 🛒 **Full Shopping Cart Functionality** - Add, remove, and update items in your cart
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🔒 **Security First** - Content Security Policy, XSS protection, and input validation
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations
- 🚀 **Fast & Optimized** - Built with Next.js for optimal performance
- 📦 **GitHub Pages Ready** - Automatic deployment to GitHub Pages

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/snappycart-demo.git
cd snappycart-demo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Building for Production

Build the application for production:

```bash
npm run build
```

This creates an optimized production build in the `out` directory, ready for static hosting.

## 🌐 Deploying to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Setup Steps:

1. **Push to GitHub**: Push your code to a GitHub repository

2. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to Pages
   - Under "Source", select "GitHub Actions"

3. **Set Base Path** (if using a repository name that's not the root):
   - If your repository is at `username.github.io/snappycart-demo`, update `.github/workflows/deploy.yml`:
   - Change `NEXT_PUBLIC_BASE_PATH: /snappycart-demo` to match your repository name
   - Or set it to `/` if deploying to the root domain

4. **Deploy**: The GitHub Actions workflow will automatically:
   - Build your Next.js application
   - Deploy it to GitHub Pages
   - Update on every push to `main` or `master` branch

### Manual Deployment:

If you prefer to deploy manually:

```bash
npm run build
# The static files will be in the 'out' directory
# Upload these files to your hosting provider
```

## 🔒 Security Features

This application implements multiple security layers:

- **Content Security Policy (CSP)** - Prevents XSS attacks
- **Input Validation** - All user inputs are sanitized
- **XSS Protection** - Script tag removal and character escaping
- **Secure Headers** - X-Frame-Options, X-Content-Type-Options, etc.
- **Type Safety** - Full TypeScript implementation

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.3
- **React**: 19.2.3
- **Cart Library**: SnappyCart 1.1.0
- **Styling**: Tailwind CSS 4
- **Type Safety**: TypeScript 5
- **Deployment**: GitHub Pages with GitHub Actions

## 📝 Project Structure

```
snappycart-demo/
├── app/
│   ├── layout.tsx      # Root layout with metadata and security headers
│   ├── page.tsx        # Main page with cart functionality
│   └── globals.css     # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment workflow
├── next.config.ts      # Next.js configuration for static export
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (requires build first)
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework
- [SnappyCart](https://www.npmjs.com/package/snappycart) - Shopping cart library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

---

Made with ❤️ using Next.js and SnappyCart
