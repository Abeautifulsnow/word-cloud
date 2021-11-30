import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import WordCloud from './components/wordCloud';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WordCloud />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
