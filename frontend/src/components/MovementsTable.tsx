import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectRow } from '../state/HomePage/HomePage.actionCreators';
// Components
import { CircularProgress } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
// Types
import { State } from '../state/RootReducer';
// Helpers
import { generateTableColumns } from '../helpers/GenerateTableColumns';
// Const
import { TableTitles } from '../const/TableTitles';

export default function MovementsTable() {
    const dispatch = useDispatch();
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
                    onRowClick={() => dispatch(selectRow(null))}
                    onRowDoubleClick={(row) => dispatch(selectRow(row))}
                />}
        </div>
    )
};