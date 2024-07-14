import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import reportWebVitals from './reportWebVitals';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);

reportWebVitals();
