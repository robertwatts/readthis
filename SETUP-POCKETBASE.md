# PocketBase Setup Guide for ReadThis

This guide will help you set up PocketBase locally with a complete books collection for the ReadThis application.

## Quick Start

### 1. Download PocketBase

The PocketBase binary should be downloaded and placed in the root directory of this project.

```bash
# For Linux (x64)
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.26.6/pocketbase_0.26.6_linux_amd64.zip -o pocketbase.zip
unzip pocketbase.zip
rm pocketbase.zip
chmod +x pocketbase

# For macOS (Intel)
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.26.6/pocketbase_0.26.6_darwin_amd64.zip -o pocketbase.zip
unzip pocketbase.zip
rm pocketbase.zip
chmod +x pocketbase

# For macOS (Apple Silicon)
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.26.6/pocketbase_0.26.6_darwin_arm64.zip -o pocketbase.zip
unzip pocketbase.zip
rm pocketbase.zip
chmod +x pocketbase

# For Windows
# Download from: https://github.com/pocketbase/pocketbase/releases/download/v0.26.6/pocketbase_0.26.6_windows_amd64.zip
# Extract pocketbase.exe to the project root
```

### 2. Start PocketBase

```bash
./pocketbase serve
```

PocketBase will start on `http://127.0.0.1:8090`

### 3. Create Admin User

```bash
./pocketbase superuser create admin@example.com admin1234567890
```

⚠️ **Important**: Change this password in production!

### 4. Create Books Collection

```bash
npm install
npm run pocketbase:setup
```

This will create the books collection with all necessary fields.

### 5. Add Sample Books (Optional)

```bash
node scripts/add-sample-books.js
```

This adds 3 sample books to get you started.

### 6. Start the Application

```bash
npm run dev
```

Visit `http://localhost:4321/books` to see your books!

## Books Collection Schema

The books collection includes both customer-facing and metadata fields:

### Customer-Facing Fields

- **title** (text, required) - The book title
- **author** (text) - Author name
- **subtitle** (text) - Book subtitle
- **description** (text) - Full book description
- **cover** (text) - URL to book cover image
- **publisher** (text) - Publisher name
- **publishedDate** (text) - Publication date
- **language** (text) - Book language (e.g., "en")
- **categories** (JSON array) - Book categories/genres

### Metadata Fields

- **isbn** (text) - Primary ISBN (can be ISBN-10 or ISBN-13)
- **isbn10** (text) - ISBN-10 identifier
- **isbn13** (text) - ISBN-13 identifier
- **googleBooksId** (text) - Google Books API identifier
- **openLibraryId** (text) - Open Library API identifier
- **pageCount** (number) - Number of pages

### User Tracking Fields

- **status** (text) - Reading status (to-read, reading, completed, abandoned)
- **tags** (JSON array) - Custom tags

## API Access

The collection is configured for public read access (no authentication required for viewing books). This allows the frontend application to fetch books without requiring user authentication.

To modify access rules, visit the PocketBase admin UI at `http://127.0.0.1:8090/_/` and navigate to Collections → books → API Rules.

## Environment Variables

You can configure the PocketBase URL via environment variables:

```bash
# .env file
POCKETBASE_URL=http://127.0.0.1:8090
```

## Scripts

- `npm run pocketbase:setup` - Create/update the books collection schema
- `node scripts/add-sample-books.js` - Add sample books to the collection
- `node scripts/create-books-collection.js` - Create the books collection programmatically

## Troubleshooting

### PocketBase not starting

Make sure the binary has execute permissions:
```bash
chmod +x pocketbase
```

### Cannot connect to PocketBase

Ensure PocketBase is running:
```bash
./pocketbase serve
```

Check that it's accessible at `http://127.0.0.1:8090/api/health`

### No books showing on the website

1. Verify PocketBase is running
2. Check that the books collection exists (visit admin UI)
3. Ensure books have been added to the collection
4. Verify API rules allow public read access (listRule and viewRule should be empty strings)

### Authentication errors in scripts

Make sure you created the admin user:
```bash
./pocketbase superuser create admin@example.com admin1234567890
```

## Production Deployment

For production:

1. Deploy PocketBase to a server (e.g., AWS, DigitalOcean, Fly.io)
2. Set strong admin credentials
3. Update the `POCKETBASE_URL` environment variable in your Astro app
4. Configure appropriate API rules for your use case
5. Set up backups for the `pb_data` directory

## Additional Resources

- [PocketBase Documentation](https://pocketbase.io/docs/)
- [PocketBase JavaScript SDK](https://github.com/pocketbase/js-sdk)
- [ReadThis Main README](./README.md)
