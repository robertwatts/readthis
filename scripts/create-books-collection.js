#!/usr/bin/env node

/**
 * Create PocketBase books collection with proper field types
 */

import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function setup() {
  console.log('Creating books collection...\n');
  
  // Authenticate
  await pb.admins.authWithPassword('admin@example.com', 'admin1234567890');
  
  // Create collection with all fields except select
  const collection = await pb.collections.create({
    name: 'books',
    type: 'base',
    listRule: '',
    viewRule: '',
    createRule: '',
    updateRule: '',
    deleteRule: '',
    fields: [
      // Text fields
      { name: 'title', type: 'text', required: true, options: {} },
      { name: 'author', type: 'text', required: false, options: {} },
      { name: 'subtitle', type: 'text', required: false, options: {} },
      { name: 'description', type: 'text', required: false, options: {} },
      { name: 'cover', type: 'text', required: false, options: {} },
      { name: 'publisher', type: 'text', required: false, options: {} },
      { name: 'publishedDate', type: 'text', required: false, options: {} },
      { name: 'language', type: 'text', required: false, options: {} },
      { name: 'isbn', type: 'text', required: false, options: {} },
      { name: 'isbn10', type: 'text', required: false, options: {} },
      { name: 'isbn13', type: 'text', required: false, options: {} },
      { name: 'googleBooksId', type: 'text', required: false, options: {} },
      { name: 'openLibraryId', type: 'text', required: false, options: {} },
      { name: 'notes', type: 'text', required: false, options: {} },
      { name: 'status', type: 'text', required: false, options: {} }, // Will be select later
      
      // Number fields
      { name: 'pageCount', type: 'number', required: false, options: {} },
      { name: 'rating', type: 'number', required: false, options: { min: 0, max: 5 } },
      { name: 'ratingsCount', type: 'number', required: false, options: {} },
      
      // JSON fields
      { name: 'categories', type: 'json', required: false, options: {} },
      { name: 'tags', type: 'json', required: false, options: {} },
    ]
  });
  
  console.log('✓ Books collection created!');
  console.log('  ID:', collection.id);
  console.log('  Fields:', collection.fields.filter(f => !f.system).map(f => f.name).join(', '));
}

setup().catch(err => {
  console.error('Error:', err.message);
  if (err.data) {
    console.error('Details:', JSON.stringify(err.data, null, 2));
  }
  process.exit(1);
});
