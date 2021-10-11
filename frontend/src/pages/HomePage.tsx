import React, { useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomePageActionCreators from '../state/HomePage/HomePage.actionCreators';
// Components
import MovementsTable from '../components/MovementsTable';
import TableFilters from '../components/TableFilters';
// Types
import { State } from '../state/RootReducer'
import Buttons from '../components/Buttons';
import MovementsModal from '../components/MovementsModal';

export default function HomePage() {
    const dispatch = useDispatch();
    const state = useSelector((state: State) => state.HomePage);

    const { fetchMovements, fetchCategories } = bindActionCreators(HomePageActionCreators, dispatch);

    useEffect(() => {
            fetchMovements(null,
                '2021-10-01',
                new Date().toISOString().substring(0, 10),
                null,
                1);
            fetchCategories(1);
    }, []);

    return (
        <main className="home-page__container">
            <MovementsTable />
            <div className="actions-and-table__container">
                <Buttons />
                <TableFilters />
            </div>
            <MovementsModal />
        </main>
    )
};