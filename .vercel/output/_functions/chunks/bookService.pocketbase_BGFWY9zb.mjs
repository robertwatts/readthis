import PocketBase from 'pocketbase';

let pb = null;
function getPocketBaseClient() {
  if (pb) return pb;
  const pocketbaseUrl = "http://127.0.0.1:8090";
  pb = new PocketBase(pocketbaseUrl);
  return pb;
}

class PocketBaseService {
  collectionName;
  /**
   * Create a new PocketBaseService
   * @param collectionName The name of the PocketBase collection
   */
  constructor(collectionName) {
    this.collectionName = collectionName;
  }
  /**
   * Get all records from the collection
   * @param options Query options (filter, sort, etc.)
   * @returns Array of records
   */
  async getAll(options = {}) {
    const pb = getPocketBaseClient();
    try {
      const records = await pb.collection(this.collectionName).getList(1, 50, options);
      return records.items;
    } catch (error) {
      console.error(`Error fetching records from ${this.collectionName}:`, error);
      return [];
    }
  }
  /**
   * Get a single record by ID
   * @param id The record ID
   * @param expand Fields to expand
   * @returns The record or null if not found
   */
  async getById(id, expand) {
    const pb = getPocketBaseClient();
    try {
      const record = await pb.collection(this.collectionName).getOne(id, { expand });
      return record;
    } catch (error) {
      console.error(`Error fetching record ${id} from ${this.collectionName}:`, error);
      return null;
    }
  }
  /**
   * Create a new record
   * @param data The record data
   * @returns The created record or null if creation failed
   */
  async create(data) {
    const pb = getPocketBaseClient();
    try {
      const record = await pb.collection(this.collectionName).create(data);
      return record;
    } catch (error) {
      console.error(`Error creating record in ${this.collectionName}:`, error);
      return null;
    }
  }
  /**
   * Update an existing record
   * @param id The record ID
   * @param data The updated data
   * @returns The updated record or null if update failed
   */
  async update(id, data) {
    const pb = getPocketBaseClient();
    try {
      const record = await pb.collection(this.collectionName).update(id, data);
      return record;
    } catch (error) {
      console.error(`Error updating record ${id} in ${this.collectionName}:`, error);
      return null;
    }
  }
  /**
   * Delete a record
   * @param id The record ID
   * @returns True if deletion was successful, false otherwise
   */
  async delete(id) {
    const pb = getPocketBaseClient();
    try {
      await pb.collection(this.collectionName).delete(id);
      return true;
    } catch (error) {
      console.error(`Error deleting record ${id} from ${this.collectionName}:`, error);
      return false;
    }
  }
}

class BookService extends PocketBaseService {
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
  async getAllBooks(options = {}) {
    const books = await this.getAll(options);
    return books;
  }
  /**
   * Get a book by ID
   * @param id The book ID
   * @returns The book or null if not found
   */
  async getBookById(id) {
    const book = await this.getById(id);
    return book;
  }
  /**
   * Get a book by ISBN
   * @param isbn The book ISBN
   * @returns The book or null if not found
   */
  async getBookByIsbn(isbn) {
    const pb = getPocketBaseClient();
    try {
      const records = await pb.collection("books").getList(1, 1, {
        filter: `isbn = "${isbn}"`
      });
      if (records.items.length === 0) {
        return null;
      }
      return records.items[0];
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
  async createBook(book) {
    const createdBook = await this.create(book);
    return createdBook;
  }
  /**
   * Update a book
   * @param id The book ID
   * @param book The updated book data
   * @returns The updated book or null if update failed
   */
  async updateBook(id, book) {
    const updatedBook = await this.update(id, book);
    return updatedBook;
  }
}

export { BookService as B };
