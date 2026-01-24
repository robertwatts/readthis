# PocketBase Integration for ReadThis

⚠️ **Note**: This document provides a high-level overview. For detailed setup instructions, see [SETUP-POCKETBASE.md](./SETUP-POCKETBASE.md).

This document provides an overview of how PocketBase is used with the ReadThis application.

## What is PocketBase?

[PocketBase](https://pocketbase.io/) is an open-source backend consisting of:
- Embedded SQLite database
- Admin dashboard UI
- Realtime subscriptions
- Authentication
- File storage
- API endpoints

## Setup Instructions

For complete setup instructions, please see [SETUP-POCKETBASE.md](./SETUP-POCKETBASE.md).

### Quick Start

1. Download PocketBase
2. Start PocketBase: `./pocketbase serve`
3. Create admin: `./pocketbase superuser create admin@example.com password`
4. Set up collection: `npm run pocketbase:setup`
5. Add sample books (optional): `node scripts/add-sample-books.js`

## Books Collection Schema

The books collection includes comprehensive fields for both customer-facing information and metadata:

### Customer-Facing Fields
- title, author, subtitle, description
- cover (image URL), publisher, publishedDate, language
- categories (JSON array)

### Metadata Fields
- isbn, isbn10, isbn13
- googleBooksId, openLibraryId
- pageCount
- status (to-read, reading, completed, abandoned)
- tags (JSON array)

For the complete field list and setup process, see [SETUP-POCKETBASE.md](./SETUP-POCKETBASE.md).

## Using the Application

### Viewing Books

1. Start PocketBase: `./pocketbase serve`
2. Start the app: `npm run dev`
3. Navigate to `/books` to view all books

### Adding Books

You can add books in several ways:

1. **Via PocketBase Admin UI**: Visit `http://127.0.0.1:8090/_/` and manually add books
2. **Via API**: Use the books collection API to programmatically add books
3. **Via Sample Script**: Run `node scripts/add-sample-books.js` to add sample data

### Viewing Book Details

Click on any book in the books list to view its complete details including all metadata fields.

## API Integration

The application uses the following services to interact with PocketBase:

- `pocketbaseClient.ts` - Creates and manages the PocketBase client instance
- `pocketbaseService.ts` - Generic service for interacting with PocketBase collections
- `bookService.pocketbase.ts` - Specialized service for the books collection with enhanced Book interface

The Book interface includes all customer-facing and metadata fields. See [Book Interface documentation](./src/services/bookService.pocketbase.ts) for the complete field list.

## Extending the Application

To add more collections and functionality:

1. Create a new collection in PocketBase (via admin UI or programmatically)
2. Create a specialized service for the collection (similar to `bookService.pocketbase.ts`)
3. Create new pages and components to interact with the collection
4. Update the TypeScript interface to match your collection schema

## Deployment

When deploying to production:

1. Deploy PocketBase to a server (see [SETUP-POCKETBASE.md](./SETUP-POCKETBASE.md) for details)
2. Update the `POCKETBASE_URL` in your environment variables to point to your PocketBase instance
3. Deploy your Astro application
4. Configure appropriate API rules for production use
5. Set up regular backups of the `pb_data` directory

For detailed deployment instructions, see [SETUP-POCKETBASE.md](./SETUP-POCKETBASE.md).

## Resources

- [PocketBase Documentation](https://pocketbase.io/docs/)
- [PocketBase JavaScript SDK](https://github.com/pocketbase/js-sdk)
- [Astro Documentation](https://docs.astro.build)
