import fs from 'fs';
import path from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 5173;

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let page = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      page = await vite.transformIndexHtml(url, page);
      const htmlParts = page.split('<!--ssr-body-->');

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

      const { pipe } = await render(url, {
        onShellReady() {
          res.write(htmlParts[0]);
          pipe(res);
        },
        onAllReady() {
          res.write(htmlParts[1]);
          res.end();
        },
      });
    } catch (e) {
      const err = e as Error;
      vite.ssrFixStacktrace(err);
      next(err);
    }
  });

  app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
}

createServer();
