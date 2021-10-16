import React from 'react'
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../state/HomePage/HomePage.actionCreators';
// Components
import { Button, ButtonGroup } from '@material-ui/core';
// Styles
import { makeStyles } from '@material-ui/styles';
// Types
import { State } from '../state/RootReducer';

const useStyles = makeStyles(() => ({
    root: {
        marginBottom: '1rem'
    }
}));

export default function Buttons() {
    const dispatch = useDispatch();
    const { rowSelected } = useSelector((state: State) => state.HomePage);

    const classes = useStyles();

    return rowSelected ?
        <ButtonGroup className={classes.root}>
            <Button type="button" onClick={() => dispatch(openModal('Edit'))}>Edit</Button>
            <Button type="button" onClick={() => dispatch(openModal('Delete'))}>Delete</Button>
            <Button type="button" onClick={() => dispatch(openModal('CategoriesTable'))}>Manage Categories</Button>
        </ButtonGroup>
        :
        <ButtonGroup className={classes.root}>
            <Button type="button" onClick={() => dispatch(openModal('Add'))}>Add</Button>
            <Button type="button" onClick={() => dispatch(openModal('CategoriesTable'))}>Manage Categories</Button>
        </ButtonGroup>
};