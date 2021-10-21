import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// Pages
import NavBar from './components/Navbar';
import { checkAuth } from './helpers/CheckAuth';
import { getLocalStorage } from './helpers/LocalStorage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

export default function App() {
    const user = getLocalStorage();

    useEffect(() => {
        checkAuth(user)
    }, [user]);

    return (
        <Router>
            <NavBar />
            <Route path="/" exact component={LoginPage} />
            <Route path="/home" exact component={HomePage} />
        </Router>
    );
};