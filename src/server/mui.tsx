import express from 'express';
import * as React from 'react';
import ReactDOMServer, { renderToString } from 'react-dom/server';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StaticRouter } from "react-router-dom/server";
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';

import createEmotionCache from '../common/createEmotionCache';
import loadApp from '@/common/app';
import createCache from '@emotion/cache';
import { ReactElement } from 'react';

export default async function handleRenderMUI(req, res) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);
  const app = await loadApp();
  // Render the component to a string.
  const html = renderToString(
    <CacheProvider value={cache}>

      <CssBaseline />
      <StaticRouter location={req.url}>
        {app}
      </StaticRouter>
    </CacheProvider>
  );

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, emotionCss));
}

function renderFullPage(html, css) {
  return `
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
          <main>${html}</main>
          <script type='module' src='/src/client/index.tsx'></script>
        </body>
      </html>
    `;
}

// const isProduction = process.env.NODE_ENV === 'production'

// export async function renderPage(element: ReactElement) {


//   let pageHtml = ""
//   //pageHtml = ReactDOMServer.renderToStaticMarkup(element);
//   pageHtml = renderToString(element);
//   if (!isProduction) {
//     pageHtml = html.prettyPrint(pageHtml, { indent_size: 4 });
//   }


//   return pageHtml
// }