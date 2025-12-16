# Geek At Your Spot Workspace

An Angular 21 monorepo workspace containing a reusable component library and multiple Angular applications for building custom web elements and WordPress integration.

## 📦 Project Structure

This is a multi-project Angular workspace with the following projects:

### **geek-at-your-spot-component-library**
A standalone Angular component library featuring reusable UI components:
- **Navbar** - Responsive navigation bar with hamburger menu
- **Sidebar** - Slide-out navigation sidebar
- **FrontPageHero** - Hero section component

### **my-elements-app**
Angular application that converts library components into custom web elements for use in any HTML environment (including WordPress).

### **angular-custom-element-nav-bar**
SSR-enabled Angular application with server-side rendering support.

### **angular-custom-elements**
Another SSR-enabled Angular application for custom element development.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or later recommended)
- npm 11.6.4 (specified in package.json)
- Angular CLI 21.0.0

### Installation

```bash
# Install dependencies
npm install
```

## 📚 Development Commands

### Building Projects

```bash
# Build the component library (always build this first)
ng build geek-at-your-spot-component-library

# Build individual applications
ng build my-elements-app
ng build angular-custom-element-nav-bar
ng build angular-custom-elements
```

### Development Server

```bash
# Serve a specific project
ng serve my-elements-app
ng serve angular-custom-element-nav-bar
ng serve angular-custom-elements

# Default development server runs on http://localhost:4200/
```

### Server-Side Rendering

For projects with SSR support:

```bash
# Build the SSR project first
ng build angular-custom-element-nav-bar

# Run the SSR server
npm run serve:ssr:angular-custom-element-nav-bar
```

```bash
# For angular-custom-elements
ng build angular-custom-elements
npm run serve:ssr:angular-custom-elements
```

### Testing

```bash
# Run unit tests for a specific project
ng test geek-at-your-spot-component-library
ng test my-elements-app
```

### Linting

```bash
ng lint
```

### Watch Mode

```bash
ng build --watch --configuration development
```

## 🎨 Component Library Usage

### Building the Library

The component library must be built before it can be used by other projects:

```bash
ng build geek-at-your-spot-component-library
```

Build artifacts will be in `dist/geek-at-your-spot-component-library/`.

### Using Components in Another Project

```typescript
import { Navbar, Sidebar, FrontPageHero } from 'geek-at-your-spot-component-library';

@Component({
  selector: 'app-root',
  imports: [Navbar, Sidebar, FrontPageHero],
  template: `
    <lib-navbar></lib-navbar>
    <lib-front-page-hero></lib-front-page-hero>
  `
})
export class AppComponent {}
```

## 🌐 Custom Web Elements

The `my-elements-app` project creates custom web elements that can be used in any HTML page:

1. Build the project:
```bash
ng build my-elements-app
```

2. Include the generated JavaScript in your HTML:
```html
<script src="dist/my-elements-app/browser/main-[hash].js"></script>
```

3. Use the custom elements:
```html
<app-navbar></app-navbar>
<app-hero></app-hero>
```

## 🔌 WordPress Integration

This workspace includes WordPress theme files for integrating Angular components:

- **front-page.php** - WordPress front page template
- **functions.php** - Enqueues Angular build artifacts

### Setup for WordPress:

1. Build the required projects
2. Copy build artifacts to your WordPress theme assets directory
3. Update the file hashes in `functions.php` to match your build output
4. Place `front-page.php` and `functions.php` in your WordPress theme directory

## 🏗️ Project Technologies

- **Angular 21.0.0** - Modern signals-based reactive framework
- **TypeScript 5.9.2** - Strict mode enabled
- **Bootstrap 5.3.8** - CSS framework (using @use/@forward syntax)
- **Sass 1.94.2** - CSS preprocessor
- **Vitest 4.0.8** - Unit testing
- **Angular Elements** - Web components support
- **Express 5.1.0** - Server for SSR

## 🔧 Configuration Files

- **angular.json** - Angular CLI workspace configuration
- **tsconfig.json** - TypeScript compiler configuration with strict settings
- **package.json** - Dependencies and npm scripts
- **.editorconfig** - Code style consistency

## 📝 Code Style

This project uses:
- Prettier for code formatting (printWidth: 100, singleQuote: true)
- ESLint with angular-eslint rules
- TypeScript strict mode

## 🎯 Key Features

- ✅ Zoneless change detection for better performance
- ✅ Standalone components (no NgModules)
- ✅ Signal-based reactive state management
- ✅ Server-side rendering (SSR) support
- ✅ Custom web elements for framework-agnostic deployment
- ✅ TypeScript strict mode
- ✅ Modern Sass with @use/@forward syntax
- ✅ WordPress theme integration

## 📦 Build Output

Built projects are output to the `dist/` directory:
```
dist/
├── geek-at-your-spot-component-library/
├── my-elements-app/
├── angular-custom-element-nav-bar/
└── angular-custom-elements/
```

## 🤝 Contributing

When adding new components to the library:

1. Create component in `projects/geek-at-your-spot-component-library/src/lib/`
2. Export it in `projects/geek-at-your-spot-component-library/src/public-api.ts`
3. Rebuild the library: `ng build geek-at-your-spot-component-library`
4. Use in your applications

## 📄 License

Private project - see package.json

## 🔗 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Angular Elements Guide](https://angular.dev/guide/elements)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
