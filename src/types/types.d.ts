import {DOMAttributes} from 'react'

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

export {}

declare global {
  interface Window {
    Module: any; 
 
  }
  namespace JSX {
    interface IntrinsicElements {
      'polaris-article': { };
    }
  }
} 