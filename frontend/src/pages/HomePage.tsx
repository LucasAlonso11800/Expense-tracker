import React, { useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import MovementsTable from '../components/MovementsTable';
import * as HomePageActionCreators from '../state/HomePage/HomePage.actionCreators';
// Types
import { State } from '../state/RootReducer'

export default function HomePage() {
    const dispatch = useDispatch();
    const state = useSelector((state: State) => state.HomePage);
    console.log(state);
    const { fetchMovements } = bindActionCreators(HomePageActionCreators, dispatch);
    
    useEffect(() => {
        fetchMovements(null,
            null,
            '2021-10-01',
            '2021-10-08',
            null,
            1)
    }, []);

    return (
        <div>
            <MovementsTable />
        </div>
    )
};