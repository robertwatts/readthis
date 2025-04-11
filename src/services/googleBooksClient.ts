import axios from "axios";

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

class GoogleBooksClient {
  private apiKey: string;
  private baseUrl: string = "https://www.googleapis.com/books/v1/volumes";

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
      interface GoogleBooksApiResponse {
        items?: GoogleBook[];
      }
      const data = response.data as GoogleBooksApiResponse;
      return data.items ? data.items[0] : null;
    } catch (error) {
      console.error("Error fetching from Google Books:", error);
      return null;
    }
  }
}

export default GoogleBooksClient;
