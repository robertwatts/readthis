# ReadThis

ReadThis is a simple book-tracking application powered by [Astro](https://astro.build/) and [PocketBase](https://pocketbase.io/).
It allows you to browse your collection, view details for each book, and add new entries by searching external sources like Google Books and Open Library.

---

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run pocketbase:setup`| Set up PocketBase with books collection          |

## 📚 PocketBase Setup

ReadThis uses PocketBase as its backend. To get started:

1. Download PocketBase (see [SETUP-POCKETBASE.md](./SETUP-POCKETBASE.md) for instructions)
2. Start PocketBase: `./pocketbase serve`
3. Create admin user: `./pocketbase superuser create admin@example.com password`
4. Set up books collection: `npm run pocketbase:setup`
5. (Optional) Add sample books: `node scripts/add-sample-books.js`

For detailed instructions, see [SETUP-POCKETBASE.md](./SETUP-POCKETBASE.md)

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
