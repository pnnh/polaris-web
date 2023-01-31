
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import express from 'express';
import { createServer as createViteServer } from 'vite'
import { LoadHomePage } from './server';
import html from "html";

const app: express.Application = express();

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom'
})
app.use(vite.middlewares)


const isProduction = process.env.NODE_ENV === 'production'


export async function render(url: string) {

  console.log('rendering', url)

  let pageHtml = ""
  if (url === "/") {
    const homePage = await LoadHomePage();
    pageHtml = ReactDOMServer.renderToStaticMarkup(homePage);
  }

  if (!isProduction) {
    pageHtml = html.prettyPrint(pageHtml, { indent_size: 4 });
  }


  return pageHtml
}

app.use('*', async (req, res, next) => {
  const url = req.originalUrl

  try {
    // let template = "<html><header></header><body><!--ssr-outlet--></body></html>"

    // template = await vite.transformIndexHtml(url, template)

    //const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

    const appHtml = await render(url)

    //const html = template.replace(`<!--ssr-outlet-->`, appHtml)
    const html = appHtml;

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e: any) {
    vite.ssrFixStacktrace(e)
    next(e)
  }
})



app.listen(8100, () => {
  console.log('Example app listening on port 8100!');
});
