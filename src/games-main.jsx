import React from 'react';
import { createRoot } from 'react-dom/client';
import GamesPage from './GamesPage.jsx';
import '@fontsource-variable/manrope';
import '@fontsource-variable/dm-sans';
import './styles.css';
import './games.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><GamesPage /></React.StrictMode>);
