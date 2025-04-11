# PocketBase Integration for ReadThis

This document provides instructions on how to set up and use PocketBase with the ReadThis application.

## What is PocketBase?

[PocketBase](https://pocketbase.io/) is an open-source backend consisting of:
- Embedded SQLite database
- Admin dashboard UI
- Realtime subscriptions
- Authentication
- File storage
- API endpoints

## Setup Instructions

### 1. Download PocketBase

1. Go to [PocketBase Downloads](https://pocketbase.io/docs/)
2. Download the appropriate version for your operating system
3. Extract the downloaded file to a directory of your choice

### 2. Run PocketBase

1. Open a terminal and navigate to the directory where you extracted PocketBase
2. Run the following command:
   ```
   ./pocketbase serve
   ```
   (On Windows, use `pocketbase.exe serve`)
3. PocketBase will start running on http://127.0.0.1:8090

### 3. Configure PocketBase

1. Open the admin UI at http://127.0.0.1:8090/_/
2. Create an admin account when prompted
3. Create a new collection called "books" with the following fields:
   - `title` (required, type: text)
   - `author` (optional, type: text)
   - `description` (optional, type: text)
   - `cover` (optional, type: text) - URL to the book cover image
   - `isbn` (optional, type: text) - ISBN of the book

### 4. Configure the ReadThis Application

1. Make sure the `.env` file in the root of the project contains:
   ```
   POCKETBASE_URL=http://127.0.0.1:8090
   ```
   (This should already be set up for you)

2. Start the ReadThis application:
   ```
   npm run dev
   ```

3. Visit http://localhost:4321 in your browser

## Using the Application

### Viewing Books

1. Click on "View Books" on the homepage or navigate to `/books`
2. This page will display all books from your PocketBase collection

### Adding Books

1. Use the PocketBase admin UI to add books to your collection
2. Fill in the book details (title, author, description, cover URL, ISBN)
3. The books will appear in the ReadThis application

### Viewing Book Details

1. Click on a book in the books list
2. You'll be taken to a page showing the book's details

## API Integration

The application uses the following services to interact with PocketBase:

- `pocketbaseClient.ts` - Creates and manages the PocketBase client instance
- `pocketbaseService.ts` - Generic service for interacting with PocketBase collections
- `bookService.pocketbase.ts` - Specialized service for the books collection

## Extending the Application

To add more collections and functionality:

1. Create a new collection in PocketBase
2. Create a specialized service for the collection (similar to `bookService.pocketbase.ts`)
3. Create new pages and components to interact with the collection

## Deployment

When deploying to production:

1. Deploy PocketBase to a server
2. Update the `POCKETBASE_URL` in your environment variables to point to your PocketBase instance
3. Deploy your Astro application

## Resources

- [PocketBase Documentation](https://pocketbase.io/docs/)
- [PocketBase JavaScript SDK](https://github.com/pocketbase/js-sdk)
- [Astro Documentation](https://docs.astro.build)
