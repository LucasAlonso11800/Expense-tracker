import React, { useEffect } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../state/HomePage/HomePage.actionCreators';
// Components
import MovementsTable from '../components/MovementsTable';
import TableFilters from '../components/TableFilters';
import MovementsModal from '../components/MovementsModal';
import CategoriesModal from '../components/CategoriesModal';
import CategoriesTableModal from '../components/CategoriesTableModal';
import PeriodTotal from '../components/PeriodTotal';
import AccountsSelect from '../components/AccountsSelect';
import Buttons from '../components/Buttons';
import AccountsTableModal from '../components/AccountsTableModal';
import AccountsModal from '../components/AccountsModal';

export default function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories(1));
    }, [dispatch]);

    return (
        <main className="home-page__container">
            <div className="table-and-total__container">
                <AccountsSelect />
                <MovementsTable />
            </div>
            <div className="actions-and-filters__container">
                <Buttons />
                <TableFilters />
                <PeriodTotal />
            </div>
            <MovementsModal />
            <CategoriesModal />
            <CategoriesTableModal />
            <AccountsModal />
            <AccountsTableModal />
        </main>
    )
};