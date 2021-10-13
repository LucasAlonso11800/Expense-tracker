import React, { useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../state/HomePage/HomePage.actionCreators';
// Components
import MovementsTable from '../components/MovementsTable';
import TableFilters from '../components/TableFilters';
import MovementsModal from '../components/MovementsModal';
import PeriodTotal from '../components/PeriodTotal';
import AccountsSelect from '../components/AccountsSelect';
import Buttons from '../components/Buttons';
// Types
import { State } from '../state/RootReducer'

export default function HomePage() {
    const dispatch = useDispatch();
    const state = useSelector((state: State) => state.HomePage);

    useEffect(() => {
        dispatch(fetchCategories(1));
    }, []);

    return (
        <main className="home-page__container">
            <div className="table-and-total__container">
                <AccountsSelect />
                <MovementsTable />
                <PeriodTotal />
            </div>
            <div className="actions-and-filters__container">
                <Buttons />
                <TableFilters />
            </div>
            <MovementsModal />
        </main>
    )
};