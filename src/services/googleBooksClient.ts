export interface GoogleBookVolumeInfo {
  title: string;
  authors: string[];
  description: string;
  imageLinks?: {
    thumbnail: string;
    medium?: string;
  };
}

export interface GoogleBook {
  volumeInfo: GoogleBookVolumeInfo;
}

import axios from 'axios';

class GoogleBooksClient {
  private apiKey: string;
  private baseUrl: string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchBookByISBN(isbn: string): Promise<GoogleBook | null> {
    try {
      const response = await axios.get(`${this.baseUrl}`, {
        params: {
          q: `isbn:${isbn}`,
          key: this.apiKey,
        },
      });
      const books = response.data.items;
      return books ? books[0] : null;
    } catch (error) {
      console.error('Error fetching from Google Books:', error);
      return null;
    }
  }
}

export default GoogleBooksClient;
