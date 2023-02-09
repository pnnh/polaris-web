
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../common/createEmotionCache';
import './elements/elements'
import loadApp from '@/common/app';
import { hydrateRoot } from 'react-dom/client';
 
//const cache = createEmotionCache();

// async function loadMain() {
//   const app = await loadApp();
//   return (
//     <BrowserRouter>
//       <CacheProvider value={cache}>
//         <CssBaseline />
//         {app}
//       </CacheProvider>
//     </BrowserRouter>
//   );
// }

// loadMain().then((main) => {
//   const root = document.querySelector('#root');
//   if (root)  {
//     hydrateRoot(root, main);
//   }
// });