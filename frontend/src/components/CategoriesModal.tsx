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
import { addCategory, editCategory, deleteCategory, fetchCategories, openModal } from '../state/HomePage/HomePage.actionCreators';
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
    name: yup.string().required('Please enter a name')
});

export default function CategoriesModal() {
    const dispatch = useDispatch();
    const { modalOpen, modalAction, modalLoading, categorySelected } = useSelector((state: State) => state.HomePage);

    const refreshTable = () => dispatch(fetchCategories());

    const formik = useFormik({
        initialValues: { name: categorySelected ? categorySelected.row.name : '' },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            const { name } = values;
            switch (modalAction) {
                case 'AddCategory':
                    dispatch(addCategory(name));
                    refreshTable();
                    return;
                case 'EditCategory':
                    dispatch(editCategory(categorySelected?.row.id, name));
                    refreshTable()
                    return;
                case 'DeleteCategory':
                    dispatch(deleteCategory(categorySelected?.row.id));
                    refreshTable();
                    return;
                default: return
            }
        }
    });

    const classes = useStyles();

    const isCategoriesModal = modalAction === 'AddCategory' || modalAction === 'EditCategory' || modalAction === 'DeleteCategory';

    return (
        <Modal open={modalOpen && isCategoriesModal} className={classes.root}>
            <Paper className={classes.paper}>
                <h3 className={classes.title}>{modalAction ? modalInfo[modalAction].title : ''}</h3>
                <FormGroup className={classes.formGroup}>
                    <TextField
                        label="Category"
                        name="name"
                        placeholder="Insert category name"
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        disabled={modalAction === 'DeleteCategory' || modalLoading}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className={classes.textField}
                    />

                    {modalLoading && <CircularProgress />}

                    <div className="modal__buttons-container">
                        <Button type="button" onClick={() => dispatch(openModal('CategoriesTable'))}>Close</Button>
                        <Button type="submit" onClick={() => formik.handleSubmit()}>{modalAction ? modalInfo[modalAction].button : ''}</Button>
                    </div>
                </FormGroup>
            </Paper>
        </Modal>
    )
};