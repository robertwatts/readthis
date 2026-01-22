import { PocketBaseService, type PocketBaseRecord } from "./pocketbaseService";
import { getPocketBaseClient } from "./pocketbaseClient";

/**
 * Interface for a book record in PocketBase
 */
export interface Book extends PocketBaseRecord {
  // Customer-facing fields
  title: string;
  author?: string;
  subtitle?: string;
  description?: string;
  cover?: string; // URL to book cover image
  publisher?: string;
  publishedDate?: string;
  language?: string;
  categories?: string[]; // JSON array of categories
  
  // ISBN fields
  isbn?: string; // Primary ISBN (can be ISBN-10 or ISBN-13)
  isbn10?: string;
  isbn13?: string;
  
  // External IDs
  googleBooksId?: string;
  openLibraryId?: string;
  
  // Metadata fields
  pageCount?: number;
  rating?: number; // 0-5
  ratingsCount?: number;
  
  // User tracking fields
  status?: 'to-read' | 'reading' | 'completed' | 'abandoned';
  notes?: string;
  tags?: string[]; // JSON array of tags
}

/**
 * Service for interacting with the books collection in PocketBase
 */
export class BookService extends PocketBaseService {
  /**
   * Create a new BookService
   */
  constructor() {
    super("books");
  }

  /**
   * Get all books
   * @param options Query options (filter, sort, etc.)
   * @returns Array of books
   */
  async getAllBooks(
    options: { filter?: string; sort?: string; expand?: string } = {}
  ): Promise<Book[]> {
    const books = await this.getAll(options);
    return books as Book[];
  }

  /**
   * Get a book by ID
   * @param id The book ID
   * @returns The book or null if not found
   */
  async getBookById(id: string): Promise<Book | null> {
    const book = await this.getById(id);
    return book as Book | null;
  }

  /**
   * Get a book by ISBN
   * @param isbn The book ISBN
   * @returns The book or null if not found
   */
  async getBookByIsbn(isbn: string): Promise<Book | null> {
    const pb = getPocketBaseClient();
    try {
      const records = await pb.collection("books").getList(1, 1, {
        filter: `isbn = "${isbn}"`,
      });

      if (records.items.length === 0) {
        return null;
      }

      return records.items[0] as Book;
    } catch (error) {
      console.error(`Error fetching book with ISBN ${isbn}:`, error);
      return null;
    }
  }

  /**
   * Create a new book
   * @param book The book data
   * @returns The created book or null if creation failed
   */
  async createBook(book: Omit<Book, keyof PocketBaseRecord>): Promise<Book | null> {
    const createdBook = await this.create(book);
    return createdBook as Book | null;
  }

  /**
   * Update a book
   * @param id The book ID
   * @param book The updated book data
   * @returns The updated book or null if update failed
   */
  async updateBook(
    id: string,
    book: Partial<Omit<Book, keyof PocketBaseRecord>>
  ): Promise<Book | null> {
    const updatedBook = await this.update(id, book);
    return updatedBook as Book | null;
  }
}
