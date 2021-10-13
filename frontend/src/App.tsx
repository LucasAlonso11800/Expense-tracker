import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// Pages
import NavBar from './components/Navbar';
import HomePage from './pages/HomePage';

export default function App() {
    return (
        <Router>
            <NavBar />
            <Route path="/" exact component={HomePage} />
        </Router>
    );
};