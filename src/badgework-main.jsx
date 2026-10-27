import React from 'react';
import { createRoot } from 'react-dom/client';
import BadgeworkPage from './BadgeworkPage.jsx';
import '@fontsource-variable/manrope';
import '@fontsource-variable/dm-sans';
import './styles.css';
import './badgework.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><BadgeworkPage /></React.StrictMode>);
