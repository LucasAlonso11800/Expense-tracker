import React, { useEffect, useState } from 'react'
// Components
import { TextField } from '@material-ui/core';
// Styles
import { makeStyles } from '@material-ui/styles';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectedAccount, fetchAccounts, fetchMovements } from '../state/HomePage/HomePage.actionCreators';
// Types
import { State } from '../state/RootReducer';

const useStyles = makeStyles(() => ({
    select: {
        marginBottom: '1rem'
    }
}));

const startOfTheMonth = new Date().setDate(1);
const dateFrom = new Date(startOfTheMonth).toISOString().substring(0, 10);
const dateTo = new Date().toISOString().substring(0, 10);

export default function AccountsSelect() {
    const dispatch = useDispatch();
    const { accounts, accountsLoading, accountId } = useSelector((state: State) => state.HomePage);
    
    const [accountSelected, setAccountSelected] = useState(accountId);

    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchAccounts(1))
    }, [])

    useEffect(() => {
        dispatch(fetchMovements(null, dateFrom, dateTo, null, 1, accountSelected));
        dispatch(changeSelectedAccount(accountSelected));
    }, [accountSelected]);

    return (
        <TextField
            label="Account"
            name="account"
            className={classes.select}
            select
            SelectProps={{ native: true }}
            variant="filled"
            InputLabelProps={{ shrink: true }}
            disabled={accountsLoading}
            value={accountSelected}
            onChange={(e) => setAccountSelected(parseInt(e.target.value))}
        >
            {/* <option value={1}>Daily usage</option> */}
            {accounts.map(account => {
                return <option value={account.id} key={account.id}>{account.name}</option>
            })}
        </TextField>
    )
};