import React from 'react'
// Components
import { Button, ButtonGroup, CircularProgress, makeStyles, Modal, Paper } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../state/RootReducer';
import { closeModal, openModal, selectAccount } from '../state/HomePage/HomePage.actionCreators';
// Helpers
import { generateTableColumns } from '../helpers/GenerateTableColumns';
// Const
import { CategoriesTableTitles } from '../const/TableTitles';
import { modalInfo } from '../const/ModalInfo';

const useStyles = makeStyles(() => ({
    root: {
        margin: 'auto',
        width: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        width: '100%',
        padding: '1rem',
        height: '60vh',
    },
    dataContainer: {
        display: 'flex',
        height: '90%',
        alignItems: 'center',
        '& .MuiDataGrid-root': {
            height: '90%',
            width: '250px',
            marginRight: '1rem',
            '& .MuiDataGrid-window': {
                overflowX: 'hidden',
            }
        }
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        margin: '0.5rem 0'
    }
}));

export default function AccountsTableModal() {
    const dispatch = useDispatch();
    const { accounts, accountsLoading, modalOpen, modalAction, accountSelected } = useSelector((state: State) => state.HomePage);

    const tableColumns = generateTableColumns(CategoriesTableTitles);

    const classes = useStyles();

    const isAccountsModal = modalAction === 'AccountsTable';

    return (
        <Modal open={modalOpen && isAccountsModal} className={classes.root}>
            <Paper className={classes.paper}>
                <h3 className={classes.title}>{modalAction ? modalInfo[modalAction].title : ''}</h3>
                <div className={classes.dataContainer}>
                    {accountsLoading ?
                        <CircularProgress /> :
                        <DataGrid
                            rows={accounts.filter((account) => account.root === 'N')}
                            columns={tableColumns}
                            hideFooter
                            rowHeight={36}
                            headerHeight={54}
                            onRowClick={() => dispatch(selectAccount(null))}
                            onRowDoubleClick={(row) => dispatch(selectAccount(row))}
                        />
                    }
                    {accountSelected ?
                        <ButtonGroup>
                            <Button type="button" onClick={() => dispatch(openModal('EditAccount'))}>Edit</Button>
                            <Button type="button" onClick={() => dispatch(openModal('DeleteAccount'))}>Delete</Button>
                        </ButtonGroup>
                        :
                        <ButtonGroup>
                            <Button type="button" onClick={() => dispatch(openModal('AddAccount'))}>Add</Button>
                            <Button type="button" onClick={() => dispatch(closeModal())}>{modalAction ? modalInfo[modalAction].button : ''}</Button>
                        </ButtonGroup>
                    }
                </div>
            </Paper>
        </Modal>
    )
};