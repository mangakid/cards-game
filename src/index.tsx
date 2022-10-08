import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CardGame from './CardGame/CardGame';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CardGame />
  </React.StrictMode>
);
