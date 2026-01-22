import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, e as renderTemplate, f as renderComponent } from '../chunks/astro/server_DO4NAuY_.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
import { $ as $$Layout } from '../chunks/Layout_CFRqlMsI.mjs';
export { renderers } from '../renderers.mjs';

const astroLogo = new Proxy({"src":"/_astro/astro.Dm8K3lV8.svg","width":115,"height":48,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/readthis/readthis/src/assets/astro.svg";
							}
							
							return target[name];
						}
					});

const background = new Proxy({"src":"/_astro/background.BPKAcmfN.svg","width":1440,"height":1024,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/readthis/readthis/src/assets/background.svg";
							}
							
							return target[name];
						}
					});

const $$Astro$1 = createAstro();
const $$WelcomeWithBooks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$WelcomeWithBooks;
  return renderTemplate`${maybeRenderHead()}<div id="container" data-astro-cid-23t3we56> <img id="background"${addAttribute(background.src, "src")} alt="" fetchpriority="high" data-astro-cid-23t3we56> <main data-astro-cid-23t3we56> <section id="hero" data-astro-cid-23t3we56> <a href="https://astro.build" data-astro-cid-23t3we56><img${addAttribute(astroLogo.src, "src")} width="115" height="48" alt="Astro Homepage" data-astro-cid-23t3we56></a> <h1 data-astro-cid-23t3we56>Welcome to ReadThis - Your Book Tracking App</h1> <section id="links" data-astro-cid-23t3we56> <a class="button" href="/books" data-astro-cid-23t3we56>View Books</a> <a href="https://pocketbase.io/docs/" target="_blank" rel="noopener noreferrer" data-astro-cid-23t3we56>PocketBase Docs <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" data-astro-cid-23t3we56><path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zm-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-2z" data-astro-cid-23t3we56></path></svg> </a> </section> </section> </main> <a href="/books" id="news" class="box" data-astro-cid-23t3we56> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" data-astro-cid-23t3we56><path fill="#111827" d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H3V6h18v12zM9 8h2v8H9zm4 0h2v8h-2z" data-astro-cid-23t3we56></path></svg> <h2 data-astro-cid-23t3we56>Explore Your Books</h2> <p data-astro-cid-23t3we56>
Click here to browse your book collection, add new books, and keep track of your reading
      progress with PocketBase.
</p> </a> </div> `;
}, "/home/runner/work/readthis/readthis/src/components/WelcomeWithBooks.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ReadThis - Book Tracking App" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "WelcomeWithBooks", $$WelcomeWithBooks, {})} ` })}`;
}, "/home/runner/work/readthis/readthis/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/readthis/readthis/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
