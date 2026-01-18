# CodeNexus Studio - Vite React App

A modern, high-performance React application built with Vite for CodeNexus Studio showcasing next-generation web solutions.

## ⚡ Features

- **Vite Build Tool**: Lightning-fast development with HMR (Hot Module Replacement)
- **Modern React 18**: Latest React features with hooks and concurrent rendering
- **Component Architecture**: Modular, reusable components with clean separation
- **Responsive Design**: Mobile-first approach with glass morphism effects
- **Interactive Elements**: Animated typing effect, tech dashboard, and smooth transitions
- **Theme Support**: Light/dark theme toggle with localStorage persistence
- **Performance Optimized**: Fast builds, tree-shaking, and optimized bundles

## 🏗️ Components

- **Navbar**: Responsive navigation with mobile hamburger menu
- **Hero**: Animated code editor with realistic typing effect
- **Services**: Service offerings with interactive code visualizations
- **Trust**: Feature cards explaining why choose CodeNexus
- **TechDashboard**: Interactive technology showcase with tabs
- **Process**: Development process timeline without numbered steps

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codenexus-studio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx & Navbar.css
│   ├── Hero.jsx & Hero.css
│   ├── Services.jsx & Services.css
│   ├── Trust.jsx & Trust.css
│   ├── TechDashboard.jsx & TechDashboard.css
│   └── Process.jsx & Process.css
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## 🛠️ Technologies Used

- **Vite** - Next generation frontend tooling
- **React 18** - Modern React with concurrent features
- **CSS3** - Modern CSS with variables, grid, flexbox
- **Google Fonts** - Outfit & Fira Code typography
- **ESLint** - Code quality and consistency

## ⚡ Vite Benefits

- **Fast HMR**: Instant updates during development
- **Optimized Builds**: Tree-shaking and code splitting
- **Modern ES Modules**: Native ESM support
- **Plugin Ecosystem**: Rich plugin architecture
- **TypeScript Ready**: Built-in TypeScript support

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The `dist` folder contains the production-ready files that can be deployed to any static hosting service.

## 🎨 Customization

- **Themes**: Modify CSS variables in `src/index.css`
- **Components**: Each component has its own CSS file for easy customization
- **Animations**: Adjust timing and effects in component-specific CSS files

## 📄 License

This project is private and proprietary to CodeNexus Studio.