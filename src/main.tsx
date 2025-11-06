import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ToasterProvider } from './components/ui/Toaster';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ToasterProvider>
        <App />
      </ToasterProvider>
    </HelmetProvider>
  </StrictMode>
);