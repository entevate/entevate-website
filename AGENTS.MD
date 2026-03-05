# Entevate Website - Project Structure & AI Agent Guidelines

## Project Overview

This is an Astro-based website conversion for Entevate, featuring a modern, component-driven architecture optimized for performance and maintainability.

## Current Project Structure

```
entevate-website/
├── src/
│   ├── components/        # Reusable Astro components
│   ├── layouts/           # Page layout templates
│   ├── pages/             # Route-based pages (file-system routing)
│   └── global.css         # Global styles shared across the site
├── public/                # Static assets (images, fonts, etc.)
├── astro.config.mjs       # Astro configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Migration Status

### Completed

- ✅ Astro boilerplate setup with TypeScript
- ✅ Bun package manager integration
- ✅ Basic project structure established

## Development Guidelines for AI Agents

### Package Manager

This project uses **Bun** as the package manager. Use `bun` commands instead of `npm`:

- `bun install` (instead of `npm install`)
- `bun run dev` (instead of `npm run dev`)
- `bun run build` (instead of `npm run build`)

### Code Standards

- Use TypeScript for all components and logic
- Follow Astro's component conventions
- Maintain consistent indentation and formatting
- Preserve existing styling and branding

#### Styling Conventions

- Global, shared styles (colors, typography, navigation, footer, reusable components) live in `src/global.css`.
- Page-specific styles should be defined in a `<style>` tag inside the corresponding `.astro` page file.

### Component Strategy

- Extract reusable components (headers, footers, navigation)
- Create layout components for shared page structure
- Implement responsive design patterns
- Optimize for performance (lazy loading, image optimization)

### File Organization

- Keep components small and focused
- Use descriptive file names
- Group related functionality
- Follow Astro's file-system routing conventions

### Testing & Quality

- Ensure all existing functionality is preserved
- Test responsive behavior across devices
- Validate accessibility standards
- Verify SEO optimization
- Test build and deployment processes

### Asset Management

- Optimize image formats and sizes
- Implement proper image loading strategies
- Maintain existing URL structures where possible
