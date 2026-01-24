#!/usr/bin/env node

/**
 * PocketBase Setup Script
 *
 * This script initializes PocketBase with the books collection schema.
 *
 * Prerequisites:
 *   1. PocketBase must be running: ./pocketbase serve
 *   2. Admin user must be created via the UI: http://127.0.0.1:8090/_/
 *   3. Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables or use defaults
 *
 * Usage:
 *   ADMIN_EMAIL=your@email.com ADMIN_PASSWORD=yourpassword npm run pocketbase:setup
 */

import PocketBase from "pocketbase";

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin1234567890";

const pb = new PocketBase(POCKETBASE_URL);

/**
 * Books collection schema with comprehensive fields
 */
const booksCollectionSchema = {
  name: "books",
  type: "base",
  fields: [
    // Customer-facing fields
    {
      name: "title",
      type: "text",
      required: true,
      options: {
        min: 1,
        max: 500,
      },
    },
    {
      name: "author",
      type: "text",
      required: false,
      options: {
        max: 300,
      },
    },
    {
      name: "description",
      type: "text",
      required: false,
      options: {
        max: null,
      },
    },
    {
      name: "cover",
      type: "text",
      required: false,
      options: {
        max: 1000,
      },
    },
    {
      name: "isbn",
      type: "text",
      required: false,
      options: {
        max: 20,
      },
    },
    {
      name: "subtitle",
      type: "text",
      required: false,
      options: {
        max: 500,
      },
    },
    {
      name: "publisher",
      type: "text",
      required: false,
      options: {
        max: 200,
      },
    },
    {
      name: "publishedDate",
      type: "text",
      required: false,
      options: {
        max: 50,
      },
    },
    {
      name: "language",
      type: "text",
      required: false,
      options: {
        max: 10,
      },
    },
    {
      name: "categories",
      type: "json",
      required: false,
      options: {},
    },
    // Metadata fields
    {
      name: "pageCount",
      type: "number",
      required: false,
      options: {
        min: null,
        max: null,
      },
    },
    {
      name: "isbn10",
      type: "text",
      required: false,
      options: {
        max: 20,
      },
    },
    {
      name: "isbn13",
      type: "text",
      required: false,
      options: {
        max: 20,
      },
    },
    {
      name: "googleBooksId",
      type: "text",
      required: false,
      options: {
        max: 100,
      },
    },
    {
      name: "openLibraryId",
      type: "text",
      required: false,
      options: {
        max: 100,
      },
    },
    {
      name: "status",
      type: "select",
      required: false,
      options: {
        values: ["to-read", "reading", "completed", "abandoned"],
      },
    },
    {
      name: "tags",
      type: "json",
      required: false,
      options: {},
    },
  ],
  listRule: null,
  viewRule: null,
  createRule: null,
  updateRule: null,
  deleteRule: null,
};

/**
 * Note: API rules are set to null initially.
 * After collection creation, they will be updated to empty strings ("")
 * which provides public read/write access.
 * For production, you should configure appropriate access rules:
 * - listRule: "" (public read) or require authentication
 * - viewRule: "" (public read) or require authentication
 * - createRule: "@request.auth.id != ''" (authenticated users only)
 * - updateRule: "@request.auth.id != ''" (authenticated users only)
 * - deleteRule: "@request.auth.id != ''" (authenticated users only)
 */

async function authenticateAdmin() {
  try {
    console.log("Authenticating as admin...");
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log("✓ Successfully authenticated as admin");
    return true;
  } catch (error) {
    console.error("✗ Error authenticating as admin");
    console.log("\n❗ Please create an admin user first:");
    console.log(`  1. Visit ${POCKETBASE_URL}/_/`);
    console.log(`  2. Create an admin account with email: ${ADMIN_EMAIL}`);
    console.log("  3. Re-run this script");
    console.log("\n  Or set custom credentials:");
    console.log("  ADMIN_EMAIL=your@email.com ADMIN_PASSWORD=yourpass npm run pocketbase:setup");
    return false;
  }
}

async function createBooksCollection() {
  try {
    console.log("\nCreating books collection...");

    // Check if collection already exists
    try {
      const existingCollection = await pb.collections.getOne("books");
      console.log("✓ Books collection already exists");

      // Update the collection schema
      console.log("  Updating collection schema...");
      await pb.collections.update(existingCollection.id, booksCollectionSchema);
      console.log("✓ Collection schema updated successfully");
    } catch (error) {
      if (error.status === 404) {
        // Collection doesn't exist, create it
        await pb.collections.create(booksCollectionSchema);
        console.log("✓ Books collection created successfully");
      } else {
        throw error;
      }
    }

    console.log("\n📚 Books Collection Fields:");
    console.log("  Customer-facing:");
    console.log("    - title (required)");
    console.log("    - author, subtitle, description");
    console.log("    - cover (image URL)");
    console.log("    - publisher, publishedDate, language");
    console.log("    - categories (JSON array)");
    console.log("  ");
    console.log("  Metadata:");
    console.log("    - isbn, isbn10, isbn13");
    console.log("    - googleBooksId, openLibraryId");
    console.log("    - pageCount");
    console.log("    - status (to-read, reading, completed, abandoned)");
    console.log("    - tags (JSON array)");
  } catch (error) {
    console.error("✗ Error creating/updating books collection:", error.message);
    if (error.data) {
      console.error("  Details:", JSON.stringify(error.data, null, 2));
    }
    throw error;
  }
}

async function setup() {
  console.log("=== PocketBase Setup for ReadThis ===\n");
  console.log(`Connecting to PocketBase at: ${POCKETBASE_URL}`);

  try {
    // Check if PocketBase is running
    await pb.health.check();
    console.log("✓ PocketBase is running\n");
  } catch (error) {
    console.error("✗ Cannot connect to PocketBase");
    console.error(`  Make sure PocketBase is running at ${POCKETBASE_URL}`);
    console.error(`  Run: ./pocketbase serve`);
    process.exit(1);
  }

  try {
    const authenticated = await authenticateAdmin();
    if (!authenticated) {
      process.exit(1);
    }
    await createBooksCollection();

    console.log("\n=== Setup Complete! ===");
    console.log("\n📖 Next Steps:");
    console.log("  1. Access the PocketBase admin UI:");
    console.log(`     ${POCKETBASE_URL}/_/`);
    console.log(`  2. Login with: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
    console.log("  3. CHANGE YOUR ADMIN PASSWORD!");
    console.log("  4. Start adding books to your collection");
    console.log("  5. Run the app: npm run dev");
    console.log("  6. Visit: http://localhost:4321/books");
  } catch (error) {
    console.error("\n✗ Setup failed:", error.message);
    process.exit(1);
  }
}

setup();
