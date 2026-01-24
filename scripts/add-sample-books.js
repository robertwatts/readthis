#!/usr/bin/env node

/**
 * Add sample books to PocketBase
 */

import PocketBase from "pocketbase";

const POCKETBASE_URL = "http://127.0.0.1:8090";
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin1234567890";

const pb = new PocketBase(POCKETBASE_URL);

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    subtitle: "The Classic American Novel",
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    publisher: "Charles Scribner's Sons",
    publishedDate: "1925-04-10",
    language: "en",
    categories: ["Fiction", "Classics", "American Literature"],
    pageCount: 180,
    isbn: "9780743273565",
    isbn10: "0743273567",
    isbn13: "9780743273565",
    status: "completed",
    tags: ["classic", "must-read", "american-dream"],
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960.",
    cover: "https://covers.openlibrary.org/b/id/8227691-L.jpg",
    publisher: "J. B. Lippincott & Co.",
    publishedDate: "1960-07-11",
    language: "en",
    categories: ["Fiction", "Classics", "Historical Fiction"],
    pageCount: 324,
    isbn: "9780061120084",
    isbn10: "0061120081",
    isbn13: "9780061120084",
    status: "to-read",
    tags: ["classic", "social-justice", "coming-of-age"],
  },
  {
    title: "1984",
    author: "George Orwell",
    description:
      "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell's nightmarish vision of a totalitarian, bureaucratic world and one poor stiff's attempt to find individuality.",
    cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    publisher: "Secker & Warburg",
    publishedDate: "1949-06-08",
    language: "en",
    categories: ["Fiction", "Dystopian", "Science Fiction", "Classics"],
    pageCount: 328,
    isbn: "9780451524935",
    isbn10: "0451524934",
    isbn13: "9780451524935",
    status: "reading",
    tags: ["dystopian", "political", "thought-provoking"],
  },
];

async function addSampleBooks() {
  console.log("=== Adding Sample Books to PocketBase ===\n");

  try {
    await pb.health.check();
    console.log("✓ PocketBase is running\n");
  } catch (error) {
    console.error("✗ Cannot connect to PocketBase");
    console.error(`  Make sure PocketBase is running at ${POCKETBASE_URL}`);
    process.exit(1);
  }

  try {
    console.log("Authenticating as admin...");
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log("✓ Authenticated\n");
  } catch (error) {
    console.error("✗ Authentication failed");
    console.error("  Make sure admin credentials are correct");
    process.exit(1);
  }

  console.log("Adding books...");
  for (const book of sampleBooks) {
    try {
      const created = await pb.collection("books").create(book);
      console.log(`✓ Added: "${book.title}" by ${book.author}`);
    } catch (error) {
      console.log(`⚠️  Skipped: "${book.title}" (may already exist)`);
    }
  }

  console.log("\n=== Done! ===");
  console.log(`\nAdded ${sampleBooks.length} sample books to your collection.`);
  console.log("Visit http://localhost:4321/books to view them.");
}

addSampleBooks();
