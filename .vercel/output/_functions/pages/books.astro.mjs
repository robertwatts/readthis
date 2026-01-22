import { c as createComponent, a as createAstro, f as renderComponent, e as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DO4NAuY_.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CFRqlMsI.mjs';
import { B as BookService } from '../chunks/bookService.pocketbase_BGFWY9zb.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Books = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Books;
  const bookService = new BookService();
  let books = [];
  try {
    books = await bookService.getAllBooks();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Books | ReadThis" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8"> <h1 class="text-4xl font-bold mb-8">Books</h1> ${books.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${books.map((book) => renderTemplate`<div class="bg-white rounded-lg shadow-md overflow-hidden"> ${book.cover && renderTemplate`<img${addAttribute(book.cover, "src")}${addAttribute(book.title, "alt")} class="w-full h-48 object-cover">`} <div class="p-4"> <h2 class="text-xl font-semibold mb-2">${book.title}</h2> ${book.author && renderTemplate`<p class="text-gray-600 mb-2">${book.author}</p>`} ${book.description && renderTemplate`<p class="text-gray-700 line-clamp-3">${book.description}</p>`} <a${addAttribute(`/books/${book.isbn || book.id}`, "href")} class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
View Details
</a> </div> </div>`)} </div>` : renderTemplate`<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6"> <p class="text-yellow-700">
No books found. Make sure you have set up PocketBase and created a "books" collection.
</p> <div class="mt-4"> <h2 class="text-lg font-semibold mb-2">Getting Started with PocketBase</h2> <ol class="list-decimal list-inside space-y-2 text-gray-700"> <li> <a href="https://pocketbase.io/docs/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
Download PocketBase
</a>${" "}
and extract it to a directory
</li> <li>Run PocketBase with <code class="bg-gray-100 px-2 py-1 rounded">./pocketbase serve</code></li> <li>
Open the admin UI at${" "} <a href="http://127.0.0.1:8090/_/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
http://127.0.0.1:8090/_/
</a> </li> <li>Create a "books" collection with fields like title, author, description, cover, and isbn</li> <li>Add some books to your collection</li> <li>Refresh this page to see your books</li> </ol> </div> </div>`} </main> ` })}`;
}, "/home/runner/work/readthis/readthis/src/pages/books.astro", void 0);

const $$file = "/home/runner/work/readthis/readthis/src/pages/books.astro";
const $$url = "/books";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Books,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
