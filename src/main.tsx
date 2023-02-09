
import React, { ReactElement } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import express from 'express';
import { createServer as createViteServer } from 'vite'
import { renderToString } from "react-dom/server";

import timeout from 'connect-timeout';
import { createProxyMiddleware } from 'http-proxy-middleware';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StaticRouter } from "react-router-dom/server";
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';

import createEmotionCache from './common/createEmotionCache';
import loadApp from '@/common/app';
import { RestfulAddress } from './utils/config';
import { prettyPrint } from 'html';
import cssbeautify from 'cssbeautify';


const isDevelopment = process.env.NODE_ENV === 'development'


export function renderFullPage(html: string, css: string) {

  let pageHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>北极星</title>
          <base href="/" /> 
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
          <meta name="renderer" content="webkit" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="robots" content="index,follow" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" /> 
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" /> 
          <link type="text/css" rel="stylesheet" href="/src/client/index.scss"></link>
          ${css}
        </head>
        <body>
          <main id="root">${html}</main>
          <script type='module' src='/src/client/index.tsx'></script>
        </body>
      </html>
    `;
  return pageHtml;
}

async function startServer() {

  const app: express.Application = express();

  // 设置超时 返回超时响应
  app.use(timeout(30 * 1e3));
  app.use((req, res, next) => {
    if (!req.timedout) next();
  });

  app.use(createProxyMiddleware('/restful/article', {
    target: RestfulAddress.ArticleService,
    onError: (err, req, res, target) => {
      console.error("proxy error", target, err)
    }
  }));


  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })
  app.use(vite.middlewares)


  app.use('/assets', express.static('assets'));
  app.use('/build', express.static('build'));

  // app.get('/article/read/:pk', async (req, res, next) => {
  //   try {
  //     const homePage = await LoadArticleReadPage(req.params.pk)
  //     const appHtml = await renderPage(homePage)

  //     const html = appHtml;

  //     res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  //   } catch (e: any) {
  //     next(e)
  //   }
  // })

  app.use(async (req, res, next) => {
    try {
      const cache = createEmotionCache();
      const { extractCriticalToChunks, constructStyleTagsFromChunks } =
        createEmotionServer(cache);
      const app = await loadApp();

      let html = renderToString(
        <StaticRouter location={req.url}>
          <CacheProvider value={cache}>
            <CssBaseline />
            {app}
          </CacheProvider>
        </StaticRouter>
      );

      const emotionChunks = extractCriticalToChunks(html);
      let emotionCss = constructStyleTagsFromChunks(emotionChunks);
      const pretty = req.query.pretty;
      if (isDevelopment && pretty) {
        emotionCss = cssbeautify(emotionCss, {});
        html = prettyPrint(html, {});
      }

      res.send(renderFullPage(html, emotionCss));
    } catch (e: any) {

      console.error("出现错误", e.message, e.stack)
      res.status(500).send('Something broke!')
    } finally {
      next()
    }
  })

  // app.use('/', async (req, res, next) => {
  //   try {
  //     const homePage = await LoadHomePage()
  //     const appHtml = await renderPage(homePage)

  //     const html = appHtml;

  //     res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  //   } catch (e: any) {
  //     next(e)
  //   }
  // })
  app.listen(8100, () => {
    console.log('Example app listening on port 8100!');
  });
}


startServer().then()
