import fetch from 'node-fetch';

interface VolumeInfo {
  title: string;
  authors: string[];
  description: string;
}

interface Book {
  volumeInfo: VolumeInfo;
}

interface GoogleBooksResponse {
  items: Book[];
}

export async function getBookDetails(isbn: string): Promise<Book | null> {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  const data: GoogleBooksResponse = await response.json();
  console.log('API Response:', data);
  return data.items ? data.items[0] : null;
}
