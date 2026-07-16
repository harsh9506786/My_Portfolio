import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root')!;
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
