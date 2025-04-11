import PocketBase from "pocketbase";

// Create a single PocketBase instance to reuse across the app
let pb: PocketBase | null = null;

/**
 * Get the PocketBase client instance
 * @returns PocketBase client
 */
export function getPocketBaseClient(): PocketBase {
  // If we already have an instance, return it
  if (pb) return pb;

  // Get the PocketBase URL from environment variables or use a default for development
  const pocketbaseUrl = import.meta.env.POCKETBASE_URL || "http://127.0.0.1:8090";

  // Create a new PocketBase instance
  pb = new PocketBase(pocketbaseUrl);

  return pb;
}

/**
 * Reset the PocketBase client instance
 * Useful for testing or when you need to create a new connection
 */
export function resetPocketBaseClient(): void {
  pb = null;
}
