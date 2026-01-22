#!/usr/bin/env node

/**
 * Quick PocketBase Books Collection Setup
 * 
 * This creates the books collection with all fields needed for ReadThis.
 * Run this AFTER creating an admin user through the web UI.
 */

import PocketBase from 'pocketbase';
import http from 'http';

const POCKETBASE_URL = 'http://127.0.0.1:8090';
const pb = new PocketBase(POCKETBASE_URL);

// Books collection schema with comprehensive fields
const booksSchema = {
  name: 'books',
  type: 'base',
  schema: [
    // Customer-facing fields
    { name: 'title', type: 'text', required: true, options: { min: 1, max: 500 } },
    { name: 'author', type: 'text', required: false, options: { max: 300 } },
    { name: 'description', type: 'text', required: false, options: { max: null } },
    { name: 'cover', type: 'text', required: false, options: { max: 1000 } },
    { name: 'isbn', type: 'text', required: false, options: { max: 20 } },
    { name: 'subtitle', type: 'text', required: false, options: { max: 500 } },
    { name: 'publisher', type: 'text', required: false, options: { max: 200 } },
    { name: 'publishedDate', type: 'text', required: false, options: { max: 50 } },
    { name: 'language', type: 'text', required: false, options: { max: 10 } },
    { name: 'categories', type: 'json', required: false, options: {} },
    // Metadata fields
    { name: 'pageCount', type: 'number', required: false, options: {} },
    { name: 'isbn10', type: 'text', required: false, options: { max: 20 } },
    { name: 'isbn13', type: 'text', required: false, options: { max: 20 } },
    { name: 'googleBooksId', type: 'text', required: false, options: { max: 100 } },
    { name: 'openLibraryId', type: 'text', required: false, options: { max: 100 } },
    { name: 'rating', type: 'number', required: false, options: { min: 0, max: 5 } },
    { name: 'ratingsCount', type: 'number', required: false, options: {} },
    { name: 'status', type: 'select', required: false, options: { maxSelect: 1, values: ['to-read', 'reading', 'completed', 'abandoned'] } },
    { name: 'notes', type: 'text', required: false, options: { max: null } },
    { name: 'tags', type: 'json', required: false, options: {} },
  ],
  indexes: [
    'CREATE INDEX IF NOT EXISTS idx_isbn ON books (isbn)',
    'CREATE INDEX IF NOT EXISTS idx_title ON books (title)',
    'CREATE INDEX IF NOT EXISTS idx_author ON books (author)',
  ],
  listRule: null,
  viewRule: null,
  createRule: null,
  updateRule: null,
  deleteRule: null,
};

async function checkPocketBase() {
  return new Promise((resolve) => {
    const req = http.get(`${POCKETBASE_URL}/api/health`, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function setupWithoutAuth() {
  console.log('=== PocketBase Books Collection Setup ===\n');
  
  const isRunning = await checkPocketBase();
  if (!isRunning) {
    console.error('✗ PocketBase is not running');
    console.log('  Start it with: ./pocketbase serve');
    process.exit(1);
  }
  console.log('✓ PocketBase is running\n');

  // Check if we need initial setup
  try {
    const collections = await pb.collections.getFullList();
    console.log(`Found ${collections.length} existing collection(s)`);
    
    const booksCollection = collections.find(c => c.name === 'books');
    if (booksCollection) {
      console.log('\n✓ Books collection already exists!');
      console.log('  Collection ID:', booksCollection.id);
      console.log('  Fields:', booksCollection.schema.map(f => f.name).join(', '));
      return;
    }
  } catch (error) {
    // Collections endpoint requires auth, so we can't list without admin
    console.log('⚠️  Cannot check existing collections (admin auth required)');
  }

  console.log('\n❗ To complete setup:');
  console.log(`  1. Open ${POCKETBASE_URL}/_/ in your browser`);
  console.log('  2. Create an admin account if prompted');
  console.log('  3. Go to Collections');
  console.log('  4. Click "New Collection"');
  console.log('  5. Use collection name: books');
  console.log('  6. Add the following fields:\n');
  
  console.log('     Customer-facing fields:');
  console.log('     - title (text, required)');
  console.log('     - author (text)');
  console.log('     - subtitle (text)');
  console.log('     - description (text, plain)');
  console.log('     - cover (text) - for image URL');
  console.log('     - publisher (text)');
  console.log('     - publishedDate (text)');
  console.log('     - language (text)');
  console.log('     - categories (json)');
  console.log('     - isbn (text)\n');
  
  console.log('     Metadata fields:');
  console.log('     - pageCount (number)');
  console.log('     - isbn10 (text)');
  console.log('     - isbn13 (text)');
  console.log('     - googleBooksId (text)');
  console.log('     - openLibraryId (text)');
  console.log('     - rating (number, min: 0, max: 5)');
  console.log('     - ratingsCount (number)');
  console.log('     - status (select: to-read, reading, completed, abandoned)');
  console.log('     - notes (text, plain)');
  console.log('     - tags (json)\n');
  
  console.log('  7. Save the collection');
  console.log('  8. Set API Rules (all to empty for now - public access)');
  console.log('\n  Or use the automated script with admin credentials:');
  console.log('  ADMIN_EMAIL=your@email.com ADMIN_PASSWORD=pass npm run pocketbase:setup\n');
}

setupWithoutAuth();
