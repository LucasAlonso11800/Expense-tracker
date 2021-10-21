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
import { openModal, addAccount, editAccount, deleteAccount, fetchAccounts } from '../state/HomePage/HomePage.actionCreators';
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

const validationSchema = yup.object({ name: yup.string().required('Please enter a name') });

export default function AccountsModal() {
    const dispatch = useDispatch();
    const { modalOpen, modalAction, modalLoading, accountSelected } = useSelector((state: State) => state.HomePage);

    const refreshTable = () => dispatch(fetchAccounts());

    const formik = useFormik({
        initialValues: { name: accountSelected ? accountSelected.row.name : '' },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            const { name } = values;
            switch (modalAction) {
                case 'AddAccount':
                    dispatch(addAccount(name));
                    refreshTable();
                    return;
                case 'EditAccount':
                    dispatch(editAccount(accountSelected?.row.id, name));
                    refreshTable()
                    return;
                case 'DeleteAccount':
                    dispatch(deleteAccount(accountSelected?.row.id));
                    refreshTable();
                    return;
                default: return
            }
        }
    });

    const classes = useStyles();

    const isAccountsModal = modalAction === 'AddAccount' || modalAction === 'EditAccount' || modalAction === 'DeleteAccount';

    return (
        <Modal open={modalOpen && isAccountsModal} className={classes.root}>
            <Paper className={classes.paper}>
                <h3 className={classes.title}>{modalAction ? modalInfo[modalAction].title : ''}</h3>
                <FormGroup className={classes.formGroup}>
                    <TextField
                        label="Account"
                        name="name"
                        placeholder="Insert account name"
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        disabled={modalAction === 'DeleteAccount' || modalLoading}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className={classes.textField}
                    />

                    {modalLoading && <CircularProgress />}

                    <div className="modal__buttons-container">
                        <Button type="button" onClick={() => dispatch(openModal('AccountsTable'))}>Close</Button>
                        <Button type="submit" onClick={() => formik.handleSubmit()}>{modalAction ? modalInfo[modalAction].button : ''}</Button>
                    </div>
                </FormGroup>
            </Paper>
        </Modal>
    )
};