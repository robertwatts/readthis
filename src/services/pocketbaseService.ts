import { getPocketBaseClient } from "./pocketbaseClient";
import type { RecordModel } from "pocketbase";

/**
 * Generic type for PocketBase record with additional fields
 */
export type PocketBaseRecord = RecordModel;

/**
 * Service for interacting with PocketBase
 */
export class PocketBaseService {
  private collectionName: string;

  /**
   * Create a new PocketBaseService
   * @param collectionName The name of the PocketBase collection
   */
  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  /**
   * Get all records from the collection
   * @param options Query options (filter, sort, etc.)
   * @returns Array of records
   */
  async getAll(
    options: { filter?: string; sort?: string; expand?: string } = {}
  ): Promise<PocketBaseRecord[]> {
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
  async getById(id: string, expand?: string): Promise<PocketBaseRecord | null> {
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
  async create(data: Record<string, unknown>): Promise<PocketBaseRecord | null> {
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
  async update(id: string, data: Record<string, unknown>): Promise<PocketBaseRecord | null> {
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
  async delete(id: string): Promise<boolean> {
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
