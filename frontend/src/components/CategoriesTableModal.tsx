import React from 'react'
import { Button, ButtonGroup, CircularProgress, makeStyles, Modal, Paper } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../state/RootReducer';
import { generateTableColumns } from '../helpers/GenerateTableColumns';
import { CategoriesTableTitles } from '../const/TableTitles';
import { modalInfo } from '../const/ModalInfo';
import { closeModal, openModal, selectCategory } from '../state/HomePage/HomePage.actionCreators';

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

export default function CategoriesTableModal() {
    const dispatch = useDispatch();
    const { categories, categoriesLoading, modalOpen, modalAction, categorySelected, rowSelected } = useSelector((state: State) => state.HomePage);

    const tableColumns = generateTableColumns(CategoriesTableTitles);

    const classes = useStyles();

    const isCategoriesModal = modalAction === 'CategoriesTable';

    return (
        <Modal open={modalOpen && isCategoriesModal} className={classes.root}>
            <Paper className={classes.paper}>
                <h3 className={classes.title}>{modalAction ? modalInfo[modalAction].title : ''}</h3>
                <div className={classes.dataContainer}>
                    {categoriesLoading ?
                        <CircularProgress /> :
                        <DataGrid
                            rows={categories.filter((category) => category.root === 'N')}
                            columns={tableColumns}
                            hideFooter
                            rowHeight={36}
                            headerHeight={54}
                            onRowClick={() => dispatch(selectCategory(null))}
                            onRowDoubleClick={(row) => dispatch(selectCategory(row))}
                        />
                    }
                    {categorySelected ?
                        <ButtonGroup>
                            <Button type="button" onClick={() => dispatch(openModal('EditCategory'))}>Edit</Button>
                            <Button type="button" onClick={() => dispatch(openModal('DeleteCategory'))}>Delete</Button>
                        </ButtonGroup>
                        :
                        <ButtonGroup>
                            <Button type="button" onClick={() => dispatch(openModal('AddCategory'))}>Add</Button>
                            <Button type="button" onClick={() => dispatch(closeModal())}>{modalAction ? modalInfo[modalAction].button : ''}</Button>
                        </ButtonGroup>
                    }
                </div>
            </Paper>
        </Modal>
    )
};