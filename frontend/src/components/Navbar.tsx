import React from 'react';
// Components
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
// Styles
import { makeStyles } from '@material-ui/styles';
// Redux
import { useDispatch } from 'react-redux';
import { logout } from '../state/LoginPage/LoginPage.actionCreators';

const useStyles = makeStyles(() => ({
    button: {
        height: '64px',
        padding: '0 1rem'
    },
    link: {
        color: '#FFF',
        textDecoration: 'none',
    }
}));

export default function NavBar() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(logout());
        window.location.assign('/');
    };

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" className={classes.button}><Link to="/" className={classes.link}>Home</Link></Button>
                <Button color="inherit" className={classes.button} onClick={() => handleClick()}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}