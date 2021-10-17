import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Redux
import { useSelector } from 'react-redux';
// Types
import { State } from '../state/RootReducer';
// Const
import { accountsURL } from '../const/ServerURL';

export default function PeriodTotal() {
    const [accountTotal, setAccountTotal] = useState(0);

    const { movements, accountId } = useSelector((state: State) => state.HomePage);

    const total: number = movements.reduce((acc, movement) => {
        if (movement.type === 'O') return acc - movement.amount
        if (movement.type === 'I') return acc + movement.amount
        return acc
    }, 0);

    useEffect(() => {
        (async () => {
            const response: any = await axios.post(`${accountsURL}/get-totals`, { accountId, userId: 1 });
            setAccountTotal(response.data);
        })();
    }, [accountId, movements]);

    return (
        <>
            <p className="period-total"><b>Total of this period: </b>${total}</p>
            <p className="period-total"><b>Account total: </b>${accountTotal}</p>
        </>
    )
};