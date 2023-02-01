
import React, { ReactElement } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import express from 'express';
import { createServer as createViteServer } from 'vite'
import { LoadHomePage } from './server';
import html from "html";
import { JsxElement } from 'typescript';
import { LoadArticleReadPage } from './server/articles/read';

const app: express.Application = express();

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom'
})
app.use(vite.middlewares)


const isProduction = process.env.NODE_ENV === 'production'


export async function renderPage(element: ReactElement) {


  let pageHtml = ""
  pageHtml = ReactDOMServer.renderToStaticMarkup(element);
  if (!isProduction) {
    pageHtml = html.prettyPrint(pageHtml, { indent_size: 4 });
  }


  return pageHtml
}

app.get('/article/read/:pk', async (req, res, next) => {
  try {
    const homePage = await LoadArticleReadPage(req.params.pk)
    const appHtml = await renderPage(homePage)

    const html = appHtml;

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e: any) {
    next(e)
  }
})


app.use('/', async (req, res, next) => {
  try {
    const homePage = await LoadHomePage()
    const appHtml = await renderPage(homePage)

    const html = appHtml;

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e: any) {
    next(e)
  }
})


app.listen(8100, () => {
  console.log('Example app listening on port 8100!');
});
