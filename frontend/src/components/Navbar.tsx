import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

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
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" className={classes.button}><Link to="/" className={classes.link}>Home</Link></Button>
            </Toolbar>
        </AppBar>
    );
}