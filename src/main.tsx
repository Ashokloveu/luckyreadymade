// Global Storage Sandbox Polyfill for restrictive iframe environments
(() => {
  const createMemoryStorage = () => {
    return {
      store: {} as Record<string, string>,
      getItem(key: string): string | null {
        return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
      },
      setItem(key: string, value: any): void {
        this.store[key] = String(value);
      },
      removeItem(key: string): void {
        delete this.store[key];
      },
      clear(): void {
        this.store = {};
      },
      key(index: number): string | null {
        return Object.keys(this.store)[index] || null;
      },
      get length(): number {
        return Object.keys(this.store).length;
      }
    };
  };

  try {
    // Check if localStorage is accessible
    const testLocal = window.localStorage;
    if (!testLocal) {
      throw new Error('localStorage is null');
    }
    // Test write permission
    testLocal.setItem('__sandbox_test__', '1');
    testLocal.removeItem('__sandbox_test__');
  } catch (e) {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: createMemoryStorage(),
        configurable: true,
        enumerable: true,
        writable: true
      });
    } catch (err) {
      console.warn('Could not override window.localStorage', err);
    }
  }

  try {
    // Check if sessionStorage is accessible
    const testSession = window.sessionStorage;
    if (!testSession) {
      throw new Error('sessionStorage is null');
    }
    testSession.setItem('__sandbox_test__', '1');
    testSession.removeItem('__sandbox_test__');
  } catch (e) {
    try {
      Object.defineProperty(window, 'sessionStorage', {
        value: createMemoryStorage(),
        configurable: true,
        enumerable: true,
        writable: true
      });
    } catch (err) {
      console.warn('Could not override window.sessionStorage', err);
    }
  }
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
