import React from 'react';
import { createRoot } from 'react-dom/client';
import DrillPage from './DrillPage.jsx';
import '@fontsource-variable/manrope';
import '@fontsource-variable/dm-sans';
import './styles.css';
import './drill.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><DrillPage /></React.StrictMode>);
