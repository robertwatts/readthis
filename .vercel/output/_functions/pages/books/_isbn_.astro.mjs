import { c as createComponent, a as createAstro, f as renderComponent, e as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DO4NAuY_.mjs';
import 'kleur/colors';
import { B as BookService } from '../../chunks/bookService.pocketbase_BGFWY9zb.mjs';
import { $ as $$Layout } from '../../chunks/Layout_CFRqlMsI.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$isbn = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$isbn;
  const { isbn } = Astro2.params;
  const bookService = new BookService();
  let book = null;
  try {
    if (isbn) {
      book = await bookService.getBookByIsbn(isbn);
      if (!book) {
        book = await bookService.getBookById(isbn);
      }
    }
  } catch (error) {
    console.error(`Error fetching book with ISBN ${isbn}:`, error);
  }
  const containerStyle = "max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg";
  const titleStyle = "text-3xl font-bold mb-4";
  const authorStyle = "text-xl text-gray-600 mb-2";
  const imageStyle = "w-full h-auto mb-4 rounded";
  const descriptionStyle = "text-gray-800 mb-6";
  const errorStyle = "text-red-500";
  const backButtonStyle = "inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": book ? `${book.title} | ReadThis` : "Book Not Found | ReadThis" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8"> <a href="/books" class="inline-block mb-6 text-blue-600 hover:underline">← Back to Books</a> ${book ? renderTemplate`<div${addAttribute(containerStyle, "class")}> <h1${addAttribute(titleStyle, "class")}>${book.title}</h1> ${book.author && renderTemplate`<p${addAttribute(authorStyle, "class")}>${book.author}</p>`} ${book.cover && renderTemplate`<img${addAttribute(book.cover, "src")}${addAttribute(`Cover of ${book.title}`, "alt")}${addAttribute(imageStyle, "class")}>`} ${book.description && renderTemplate`<div${addAttribute(descriptionStyle, "class")}> <h2 class="text-xl font-semibold mb-2">Description</h2> <p>${book.description}</p> </div>`} ${book.isbn && renderTemplate`<div class="text-gray-600"> <p>ISBN: ${book.isbn}</p> </div>`} </div>` : renderTemplate`<div${addAttribute(containerStyle, "class")}> <h1${addAttribute(titleStyle, "class")}>Book Not Found</h1> <p${addAttribute(errorStyle, "class")}>
Sorry, we couldn't find a book with ISBN: ${isbn} </p> <a href="/books"${addAttribute(backButtonStyle, "class")}>Browse All Books</a> </div>`} </main> ` })}`;
}, "/home/runner/work/readthis/readthis/src/pages/books/[isbn].astro", void 0);

const $$file = "/home/runner/work/readthis/readthis/src/pages/books/[isbn].astro";
const $$url = "/books/[isbn]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$isbn,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
