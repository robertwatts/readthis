import fetch from 'node-fetch';

interface VolumeInfo {
  title: string;
  authors: string[];
  description: string;
  imageLinks?: {
    thumbnail: string;
    medium?: string;
  };
}

interface Book {
  volumeInfo: VolumeInfo;
}

interface GoogleBooksResponse {
  items: Book[];
}

export async function getBookDetails(isbn: string): Promise<Book | null> {
  console.log(`Fetching details for ISBN: ${isbn}`);
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  const data = await response.json() as GoogleBooksResponse;
  console.log('API Response:', data);
  return data.items ? data.items[0] : null;
}
