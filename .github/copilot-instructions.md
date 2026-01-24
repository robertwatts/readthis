# GitHub Copilot Instructions for ReadThis

## Project Overview

ReadThis is a book-tracking application built with:

- **Frontend Framework**: Astro 5.x (with TypeScript support)
- **Backend**: PocketBase
- **Styling**: Tailwind CSS 4.x
- **External APIs**: Google Books and Open Library for book search

## General Guidelines

### Code Quality

- Always run linters and formatters before committing code
- Use `npm run lint` to check for linting errors
- Use `npm run format` to format code with Prettier
- Follow TypeScript strict mode practices

### Testing and Building

- Run `npm run build` to verify your changes don't break the build
- Test locally with `npm run dev` before submitting changes
- Preview production builds with `npm run preview`

### Documentation

- Document all public APIs and exported functions with JSDoc comments
- Include parameter types, return types, and descriptions
- Update README.md if adding new features or changing workflows
- Keep comments clear and concise

## Coding Standards

### TypeScript

- Use TypeScript for all new code (`.ts` files for services, `.astro` for components)
- Enable strict type checking - avoid using `any` types
- Define proper interfaces and types for data structures
- Use type inference when obvious, explicit types when helpful for clarity
- Prefer `interface` over `type` for object shapes

### Code Style

- Follow the Prettier configuration (`.prettierrc.json`):
  - Use semicolons
  - Use double quotes for strings
  - Use 2 spaces for indentation
  - Max line length of 100 characters
  - Trailing commas in ES5-compatible locations
  - Arrow function parens: avoid when possible
- Follow ESLint rules (see `eslint.config.js`)
- Use descriptive variable and function names

### Astro Components

- Use `.astro` files for pages and components
- Prefer component composition over large monolithic files
- Keep component logic in the frontmatter section
- Use TypeScript in Astro component scripts
- Follow Astro's recommended project structure

### Services and Business Logic

- Place all service logic in `/src/services/` directory
- Create separate service files for different concerns:
  - PocketBase interactions: `*Service.pocketbase.ts` or `pocketbaseService.ts`
  - External API clients: `*Client.ts` (e.g., `googleBooksClient.ts`)
- Use classes for services with multiple related methods
- Export functions for simple utility services
- Handle errors gracefully with try-catch blocks
- Log errors to console for debugging

### Styling

- Use Tailwind CSS utility classes for styling
- Follow Tailwind's recommended practices
- Keep custom CSS minimal - prefer Tailwind utilities
- Use semantic class names when custom classes are needed

### Async/Await

- Always use async/await for asynchronous operations
- Avoid promise chains (`.then()`) - use async/await instead
- Handle errors with try-catch blocks
- Properly type async function return values

### Error Handling

- Use try-catch blocks for operations that might fail
- Log errors with descriptive messages using `console.error()`
- Return sensible defaults or empty arrays/objects on error when appropriate
- Don't let errors crash the application silently

### Naming Conventions

- Use camelCase for variables, functions, and methods
- Use PascalCase for classes, interfaces, and type definitions
- Use UPPER_SNAKE_CASE for constants
- Use descriptive names that indicate purpose
- Avoid abbreviations unless commonly understood

## File Organization

### Directory Structure

```
src/
├── assets/       # Static assets
├── components/   # Reusable Astro components
├── layouts/      # Page layouts
├── pages/        # Route pages (Astro's file-based routing)
├── services/     # Business logic and API clients
└── styles/       # Global styles
```

### When Adding New Features

- Place reusable components in `/src/components/`
- Create new pages in `/src/pages/` following Astro's routing conventions
- Add service logic to `/src/services/`
- Keep related files together

## PocketBase Integration

- Use the `PocketBaseService` class for common CRUD operations
- Access the PocketBase client via `getPocketBaseClient()` from `pocketbaseClient.ts`
- Collection-specific services should extend or use `PocketBaseService`
- Handle PocketBase errors gracefully
- Type PocketBase records properly using `RecordModel` or custom interfaces

## External API Integration

- Create separate client files for each external API
- Handle rate limiting and API errors appropriately
- Cache results when appropriate
- Document API-specific requirements and limitations

## When Making Changes

1. **Understand the context**: Review related files and existing patterns
2. **Follow existing patterns**: Match the style and structure of existing code
3. **Test thoroughly**: Run the dev server and test your changes manually
4. **Run checks**: Execute linting and build commands
5. **Update documentation**: Modify README or add JSDoc comments as needed
6. **Keep changes minimal**: Make the smallest change that solves the problem

## Specific Patterns to Follow

### Service Example

```typescript
import { getPocketBaseClient } from "./pocketbaseClient";

/**
 * Service description
 */
export class MyService {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getAll(): Promise<RecordModel[]> {
    const pb = getPocketBaseClient();
    try {
      const records = await pb.collection(this.collectionName).getList(1, 50);
      return records.items;
    } catch (error) {
      console.error(`Error fetching records:`, error);
      return [];
    }
  }
}
```

### API Client Example

```typescript
import axios from "axios";

interface SearchResult {
  id: string;
  title: string;
  // Add other fields as needed
}

/**
 * Fetches data from external API
 * @param query Search query
 * @returns Array of search results
 */
export async function searchExternalAPI(query: string): Promise<SearchResult[]> {
  try {
    const response = await axios.get(`https://api.example.com/search`, {
      params: { q: query },
    });
    return response.data.items || [];
  } catch (error) {
    console.error("Error searching external API:", error);
    return [];
  }
}
```

## Common Pitfalls to Avoid

- Don't use `any` type - use proper TypeScript types
- Don't ignore ESLint or Prettier warnings
- Don't create large monolithic files - break into smaller modules
- Don't forget to handle errors in async operations
- Don't mix different styling approaches - stick to Tailwind
- Don't commit code without running linters and build checks

## Dependencies

- Keep dependencies up to date but test thoroughly after updates
- Use `npm install` for adding new dependencies
- Prefer stable, well-maintained packages
- Check for security vulnerabilities before adding new dependencies
