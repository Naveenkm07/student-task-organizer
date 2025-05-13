
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import React from 'react';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
