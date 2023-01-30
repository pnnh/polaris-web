
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import express from 'express';  
import { createServer as createViteServer } from 'vite'

const app: express.Application = express();

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom'
})
app.use(vite.middlewares)


const isProduction = process.env.NODE_ENV === 'production'
 

app.use('*', async (req, res, next) => {
  const url = req.originalUrl

  try {
    let template = "<html><header></header><body><div id='app'><!--ssr-outlet--></div></body></html>"

    template = await vite.transformIndexHtml(url, template)

    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

    const appHtml = await render(url)

    const html = template.replace(`<!--ssr-outlet-->`, appHtml)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e: any) {
    vite.ssrFixStacktrace(e)
    next(e)
  }
})



app.listen(8100, () => {
  console.log('Example app listening on port 8100!');
});
