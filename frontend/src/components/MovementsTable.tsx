import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { State } from '../state/RootReducer';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { generateTableColumns } from '../helpers/GenerateTableColumns';
import { TableTitles } from '../const/TableTitles';

export default function MovementsTable() {
    const { movements, movementsLoading } = useSelector((state: State) => state.HomePage);

    const tableColumns = generateTableColumns(TableTitles);

    return (
        <div className="movements-table__container">
            {movementsLoading ?
                <CircularProgress /> :
                <DataGrid
                    columns={tableColumns}
                    rows={movements}
                    rowHeight={36}
                    headerHeight={54}
                    autoPageSize={true}
                />}
        </div>
    )
};