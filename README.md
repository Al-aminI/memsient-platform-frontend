# MemSient - AI Memory Platform

MemSient is the ultimate human cognitive memory system for AI agents. Build AI agents that truly remember, think, and evolve.

## Features

- **Living Memory**: AI memory that thinks, learns, and evolves like a human brain
- **Skill Acquisition**: Agents acquire skills through experience
- **Graph-Based Storage**: Efficient knowledge graph storage and retrieval
- **Temporal Awareness**: Memory with time-based relationships and evolution
- **Multi-Tenant**: Isolated memory sessions per user/tenant
- **High Performance**: Built with Rust core for optimal performance

## Tech Stack

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **React Router** - Client-side routing
- **shadcn-ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Data fetching and caching

## Getting Started

### Prerequisites

- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
# Step 1: Navigate to the project directory
cd memsient

# Step 2: Install dependencies
npm install

# Step 3: Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Deployment

### Netlify

The project includes a `public/_redirects` file for Netlify deployment. All routes will be redirected to `index.html` for proper SPA routing.

### Vercel

The project includes a `vercel.json` configuration file. Deploy directly to Vercel and routing will work automatically.

### Docker / Nginx

For Docker deployments, use the included `nginx.conf` file. It's configured to serve the SPA correctly with all routes falling back to `index.html`.

### Build Output

After running `npm run build`, the `dist/` directory contains the production-ready files that can be served by any static file server.

## Project Structure

```
memsient/
├── public/          # Static assets
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── App.tsx       # Main app component
├── index.html        # HTML template
└── vite.config.ts    # Vite configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

See LICENSE file for details.
