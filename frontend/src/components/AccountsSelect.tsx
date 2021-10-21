import React, { useEffect, useState } from 'react'
// Components
import { TextField } from '@material-ui/core';
// Styles
import { makeStyles } from '@material-ui/styles';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectedAccount, fetchAccounts, fetchMovements } from '../state/HomePage/HomePage.actionCreators';
// Const
import { dateFrom, dateTo } from '../const/Dates';
// Types
import { State } from '../state/RootReducer';

const useStyles = makeStyles(() => ({
    select: {
        marginBottom: '1rem'
    }
}));

export default function AccountsSelect() {
    const dispatch = useDispatch();
    const { accounts, accountsLoading, accountId } = useSelector((state: State) => state.HomePage);
    
    const [accountSelected, setAccountSelected] = useState(accountId);

    useEffect(() => {
        dispatch(fetchAccounts())
    }, [dispatch])
    
    useEffect(() => {
        dispatch(fetchMovements(null, dateFrom, dateTo, null, accountSelected));
        dispatch(changeSelectedAccount(accountSelected));
    }, [dispatch, accountSelected]);
    
    const classes = useStyles();

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
            {accounts.map(account => {
                return <option value={account.id} key={account.id}>{account.name}</option>
            })}
        </TextField>
    )
};