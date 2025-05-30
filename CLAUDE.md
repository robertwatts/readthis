# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start local dev server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview build locally
- `npm run lint` - Run ESLint on TypeScript and JavaScript files
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Architecture Overview

This is an Astro SSR application using:
- **Backend**: PocketBase for data storage and API
- **Frontend**: Astro with server-side rendering
- **Styling**: TailwindCSS v4
- **Deployment**: Vercel adapter configured

### Data Layer Architecture

The application uses a layered service architecture for data access:

1. **PocketBase Client** (`pocketbaseClient.ts`) - Singleton client instance
2. **Generic Service** (`pocketbaseService.ts`) - Base CRUD operations for any collection
3. **Domain Services** (`bookService.pocketbase.ts`) - Collection-specific business logic
4. **External APIs** (`googleBooksClient.ts`, `openLibraryClient.ts`) - Third-party book data

### Service Pattern

Services extend `PocketBaseService` for consistent CRUD operations:
- Use the generic service for basic operations
- Create domain-specific services that extend the base class
- Handle errors gracefully with console logging and null returns

### PocketBase Setup

PocketBase must be running locally at http://127.0.0.1:8090 for development. The books collection requires fields: title (required), author, description, cover, isbn.

## Key Files

- `src/services/pocketbaseService.ts` - Generic PocketBase service base class
- `src/services/bookService.pocketbase.ts` - Books domain service
- `astro.config.mjs` - SSR configuration with Vercel adapter
- `README.pocketbase.md` - Detailed PocketBase setup instructions