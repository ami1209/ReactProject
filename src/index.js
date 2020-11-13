import React from 'react';
import ReactDOM from 'react-dom';
// import Header from './Pages/HomePage/Header';
// import Body from './Pages/HomePage/Body';
import {BrowserRouter as Router} from "react-router-dom";
import Home from '../src/Pages/Home';
// import Footer from './Pages/HomePage/Footer';


const routing = (
    <Router>
      <Home></Home>
      </Router>
  );

ReactDOM.render(routing, document.getElementById('root'));
