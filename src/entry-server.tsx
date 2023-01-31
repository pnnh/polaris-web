import React from "react";
import * as ReactDOMServer from 'react-dom/server';
import { LoadHomePage } from './server/pages/home-server';
import html from "html";

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


