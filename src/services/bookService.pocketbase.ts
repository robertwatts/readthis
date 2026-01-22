import { PocketBaseService, type PocketBaseRecord } from "./pocketbaseService";
import { getPocketBaseClient } from "./pocketbaseClient";

/**
 * Interface for a book record in PocketBase
 */
export interface Book extends PocketBaseRecord {
  title: string;
  author?: string;
  description?: string;
  cover?: string;
  isbn?: string;
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
