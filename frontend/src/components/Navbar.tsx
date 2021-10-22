import React from 'react';
// Components
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
// Styles
import { makeStyles } from '@material-ui/styles';
// Helpers
import { deleteLocalStorage, getLocalStorage } from '../helpers/LocalStorage';

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
    const handleClick = () => {
        deleteLocalStorage()
        window.location.assign('/');
    };

    const user = getLocalStorage();

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                {user ?
                    <>
                        <Button color="inherit" className={classes.button}><Link to="/home" className={classes.link}>{user.username}</Link></Button>
                        <Button color="inherit" className={classes.button} onClick={() => handleClick()}>Logout</Button>
                    </>
                    :
                    <>
                        <Button color="inherit" className={classes.button}><Link to="/" className={classes.link}>Expense tracker</Link></Button>
                        <Button color="inherit" className={classes.button}><Link to="/register" className={classes.link}>Create account</Link></Button>
                    </>
                }
            </Toolbar>
        </AppBar>
    );
}