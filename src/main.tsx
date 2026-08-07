import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress ResizeObserver errors
const hideResizeObserverError = (e: ErrorEvent | PromiseRejectionEvent) => {
  const isErrorEvent = e instanceof ErrorEvent;
  const message = isErrorEvent ? e.message : (e as PromiseRejectionEvent).reason?.message;
  
  if (message && message.includes('ResizeObserver')) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
};
window.addEventListener('error', hideResizeObserverError as EventListener, true);
window.addEventListener('unhandledrejection', hideResizeObserverError as EventListener, true);

const originalError = console.error;
console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('ResizeObserver')) {
    return;
  }
  originalError.call(console, ...args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
