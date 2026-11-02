import React from 'react';
import { createRoot } from 'react-dom/client';
import CampPage from './CampPage.jsx';
import '@fontsource-variable/manrope';
import '@fontsource-variable/dm-sans';
import './styles.css';
import './camp.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><CampPage /></React.StrictMode>);
