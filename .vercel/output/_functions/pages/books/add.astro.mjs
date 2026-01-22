import { c as createComponent, a as createAstro, f as renderComponent, e as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DO4NAuY_.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CFRqlMsI.mjs';
import { B as BookService } from '../../chunks/bookService.pocketbase_BGFWY9zb.mjs';
import axios from 'axios';
export { renderers } from '../../renderers.mjs';

class GoogleBooksClient {
  apiKey;
  baseUrl = "https://www.googleapis.com/books/v1/volumes";
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  async fetchBookByISBN(isbn) {
    try {
      const response = await axios.get(`${this.baseUrl}`, {
        params: {
          q: `isbn:${isbn}`,
          key: this.apiKey
        }
      });
      const data = response.data;
      return data.items ? data.items[0] : null;
    } catch (error) {
      console.error("Error fetching from Google Books:", error);
      return null;
    }
  }
}

class OpenLibraryClient {
  baseUrl = "https://openlibrary.org/api/books";
  async fetchBookByISBN(isbn) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          bibkeys: `ISBN:${isbn}`,
          format: "json",
          jscmd: "data"
        }
      });
      const data = response.data;
      return data[`ISBN:${isbn}`] || null;
    } catch (error) {
      console.error("Error fetching from Open Library:", error);
      return null;
    }
  }
}

const $$Astro = createAstro();
const prerender = false;
const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Add;
  const bookService = new BookService();
  const googleClient = new GoogleBooksClient("");
  const openLibraryClient = new OpenLibraryClient();
  let isbn = "";
  let title = "";
  let author = "";
  let description = "";
  let cover = "";
  let message = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const action = formData.get("action");
    isbn = formData.get("isbn")?.toString() ?? "";
    if (action === "search") {
      if (isbn) {
        const googleBook = await googleClient.fetchBookByISBN(isbn);
        const openBook = await openLibraryClient.fetchBookByISBN(isbn);
        title = googleBook?.volumeInfo.title || openBook?.title || "";
        author = googleBook?.volumeInfo.authors?.[0] || openBook?.authors?.[0]?.name || "";
        const openDesc = typeof openBook?.description === "string" ? openBook?.description : openBook?.description?.value;
        description = googleBook?.volumeInfo.description || openDesc || "";
        cover = googleBook?.volumeInfo.imageLinks?.thumbnail || openBook?.cover?.medium || "";
      }
    } else if (action === "create") {
      title = formData.get("title")?.toString() || "";
      author = formData.get("author")?.toString() || "";
      description = formData.get("description")?.toString() || "";
      cover = formData.get("cover")?.toString() || "";
      const created = await bookService.createBook({ title, author, description, isbn, cover });
      if (created) {
        message = "Book added successfully.";
        isbn = title = author = description = cover = "";
      } else {
        message = "Failed to add book.";
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Add Book | ReadThis" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8"> <a href="/books" class="inline-block mb-6 text-blue-600 hover:underline">← Back to Books</a> <h1 class="text-3xl font-bold mb-4">Add Book</h1> ${message && renderTemplate`<p class="mb-4 text-green-600">${message}</p>`} <form method="post" class="mb-8 flex items-end gap-2"> <input type="hidden" name="action" value="search"> <label class="block"> <span class="block text-sm font-medium mb-1">Search by ISBN</span> <input type="text" name="isbn"${addAttribute(isbn, "value")} class="border rounded p-2" required> </label> <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Search</button> </form> ${(title || author || description || cover) && renderTemplate`<form method="post" class="space-y-4"> <input type="hidden" name="action" value="create"> <input type="hidden" name="isbn"${addAttribute(isbn, "value")}> <div> <label class="block mb-1 font-medium">Title</label> <input type="text" name="title"${addAttribute(title, "value")} class="w-full border rounded p-2" required> </div> <div> <label class="block mb-1 font-medium">Author</label> <input type="text" name="author"${addAttribute(author, "value")} class="w-full border rounded p-2"> </div> <div> <label class="block mb-1 font-medium">Description</label> <textarea name="description" class="w-full border rounded p-2" rows="4">${description}</textarea> </div> <div> <label class="block mb-1 font-medium">Cover URL</label> <input type="text" name="cover"${addAttribute(cover, "value")} class="w-full border rounded p-2"> </div> <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add Book</button> </form>`} </main> ` })}`;
}, "/home/runner/work/readthis/readthis/src/pages/books/add.astro", void 0);
const $$file = "/home/runner/work/readthis/readthis/src/pages/books/add.astro";
const $$url = "/books/add";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Add,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
