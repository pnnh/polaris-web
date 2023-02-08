
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import theme from '../common/theme';
import createEmotionCache from '../common/createEmotionCache';
import './elements/elements'
import loadApp from '@/common/app';

// export function HomeClientPage() {
//   return <div>
//     <h1>Home Client Page</h1>
//   </div>
// }



// const rootElement = document.getElementById('root')
// if (rootElement) {
//   ReactDOM.render(<App />, rootElement)
// }




const cache = createEmotionCache();

async function loadMain() {
  const app = await loadApp();
  return (
    <BrowserRouter>
      <CacheProvider value={cache}>
        <CssBaseline />
        {app}
      </CacheProvider>
    </BrowserRouter>
  );
}

loadMain().then((main) => {
  ReactDOM.hydrate(main, document.querySelector('#root'));
});