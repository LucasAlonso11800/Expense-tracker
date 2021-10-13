import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../state/RootReducer'

export default function PeriodTotal() {
    const { movements } = useSelector((state: State) => state.HomePage);

    const total: number = movements.reduce((acc, movement) => {
        if(movement.type === 'O') return acc - movement.amount
        if(movement.type === 'I') return acc + movement.amount
        return acc
    }, 0); 
    
    return (
        <p className="period-total"><b>Total of this period: </b>${total}</p>
    )
};