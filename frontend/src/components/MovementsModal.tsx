import React from 'react';
// Components
import { Button, FormGroup, Modal, Paper, TextField, CircularProgress } from '@material-ui/core';
// Styles
import { makeStyles } from '@material-ui/styles';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomePageActionCreators from '../state/HomePage/HomePage.actionCreators';
// Types
import { State } from '../state/RootReducer';
// Const
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
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        margin: '0.5rem 0'
    },
    formGroup: {
        padding: '1rem'
    },
    textField: {
        margin: '0.5rem 0'
    }
}));

const validationSchema = yup.object({
    date: yup.date().max(new Date(), "It can't be a future date").required('Please select a date'),
    type: yup.string().required('Please select a type'),
    amount: yup.number().required('Please enter an amount'),
    description: yup.string().required('Please enter a description'),
    category: yup.string().required('Please select a category'),
});

const startOfTheMonth = new Date().setDate(1);
const dateFrom = new Date(startOfTheMonth).toISOString().substring(0, 10);
const dateTo = new Date().toISOString().substring(0, 10);

export default function MovementsModal() {
    const dispatch = useDispatch();
    const { modalOpen, modalAction, modalLoading, categories, categoriesLoading, rowSelected, accountId } = useSelector((state: State) => state.HomePage);

    const { closeModal, addMovement, editMovement, deleteMovement, fetchMovements } = bindActionCreators(HomePageActionCreators, dispatch);

    const refreshTable = () => fetchMovements(null, dateFrom, dateTo, null, 1, 1);

    const formik = useFormik({
        initialValues: {
            date: rowSelected ? rowSelected.row.date : dateTo,
            type: rowSelected ? rowSelected.row.type : 'I',
            amount: rowSelected ? rowSelected.row.amount : 1000,
            description: rowSelected ? rowSelected.row.description : '',
            category: rowSelected ? rowSelected.row.categoryId : 1
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            const { type, amount, date, description, category } = values;
            switch (modalAction) {
                case 'Add':
                    addMovement(type, amount, date, description, category, 1, accountId);
                    refreshTable();
                    return;
                case 'Edit':
                    editMovement(rowSelected?.row.id, type, amount, date, description, category);
                    refreshTable()
                    return;
                case 'Delete': 
                    deleteMovement(rowSelected?.row.id);
                    refreshTable();
                    return;
                default: return
            }
        }
    });

    const classes = useStyles();

    return (
        <Modal open={modalOpen} className={classes.root}>
            <Paper className={classes.paper}>
                <h3 className={classes.title}>{modalAction ? modalInfo[modalAction].title : ''}</h3>
                <FormGroup className={classes.formGroup}>
                    <TextField
                        label="Date"
                        name="date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        disabled={modalAction === 'Delete' || modalLoading}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        className={classes.textField}
                    />
                    <TextField
                        label="Type"
                        name="type"
                        select
                        SelectProps={{ native: true }}
                        InputLabelProps={{ shrink: true }}
                        disabled={modalAction === 'Delete' || modalLoading}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        helperText={formik.touched.type && formik.errors.type}
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        className={classes.textField}
                    >
                        <option value="I">In</option>
                        <option value="O">Out</option>
                    </TextField>
                    <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        disabled={modalAction === 'Delete' || modalLoading}
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        className={classes.textField}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        disabled={modalAction === 'Delete' || modalLoading}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        className={classes.textField}
                    />
                    <TextField
                        label="Category"
                        name="category"
                        select
                        SelectProps={{ native: true }}
                        InputLabelProps={{ shrink: true }}
                        disabled={modalAction === 'Delete' || categoriesLoading || modalLoading}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        helperText={formik.touched.category && formik.errors.category}
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        className={classes.textField}
                    >
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </TextField>

                    {modalLoading && <CircularProgress />}

                    <div className="modal__buttons-container">
                        <Button type="button" onClick={() => closeModal()}>Close</Button>
                        <Button type="submit" onClick={() => formik.handleSubmit()}>{modalAction ? modalInfo[modalAction].button : ''}</Button>
                    </div>
                </FormGroup>
            </Paper>
        </Modal>
    )
};