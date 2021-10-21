import React from 'react';
import { Button, FormGroup, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../state/LoginPage/LoginPage.actionCreators';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/styles';
import { State } from '../state/RootReducer';

const useStyles = makeStyles(() => ({
    form: {
        width: '40%',
        margin: '0 auto',
        padding: '2rem'
    }
}));

const validationSchema = yup.object({
    email: yup.string().required('Please enter a valid email'),
    password: yup.string().required('Please enter a password')
});

export default function LoginPage() {
    const dispatch = useDispatch();
    const state = useSelector((state: State) => state.LoginPage);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const { email, password } = values;
            dispatch(loginUser(email, password))
        }
    });

    const classes = useStyles();

    return (
        <div>
            <FormGroup className={classes.form}>
                <TextField
                    label="Email"
                    name="email"
                    placeholder="Insert your email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Password"
                    name="password"
                    placeholder="Insert your password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <Button variant='contained' type='button' onClick={() => formik.handleSubmit()}>Login</Button>
            </FormGroup>
        </div>
    )
};