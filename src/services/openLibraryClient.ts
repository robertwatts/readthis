import axios from "axios";

export interface OpenLibraryBook {
  title: string;
  authors: { name: string }[];
  description?: string | { value: string };
  cover?: {
    small: string;
    medium: string;
    large: string;
  };
}

class OpenLibraryClient {
  private baseUrl: string = "https://openlibrary.org/api/books";

  async fetchBookByISBN(isbn: string): Promise<OpenLibraryBook | null> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          bibkeys: `ISBN:${isbn}`,
          format: "json",
          jscmd: "data",
        },
      });
      interface OpenLibraryApiResponse {
        [key: string]: OpenLibraryBook | undefined;
      }
      const data = response.data as OpenLibraryApiResponse;
      return data[`ISBN:${isbn}`] || null;
    } catch (error) {
      console.error("Error fetching from Open Library:", error);
      return null;
    }
  }
}

export default OpenLibraryClient;
