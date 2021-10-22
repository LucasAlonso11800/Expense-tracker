import React, { useState } from 'react';
import axios from 'axios';
// Components
import { Button, CircularProgress, FormGroup, TextField } from '@material-ui/core';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Styles
import { makeStyles } from '@material-ui/styles';
// Const
import { usersURL } from '../const/ServerURL';
// Helpers
import { setLocalStorage } from '../helpers/LocalStorage';

const useStyles = makeStyles(() => ({
    form: {
        width: '40%',
        margin: '0 auto',
        padding: '2rem'
    }
}));

const validationSchema = yup.object({
    username: yup.string().required('Please enter an username'),
    email: yup.string().required('Please enter a valid email'),
    password: yup.string().required('Please enter a password')
});

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const { email, password } = values;
            (async () => {
                setLoading(true);
                try {
                    const response: any = await axios.post(`${usersURL}/register`, { username: values.username, email, password });
                    setLoading(false);
                    const { id, username, token } = response.data;
                    setLocalStorage(id, username, token);
                    window.location.assign('/home');
                }
                catch (err: any) {
                    setError(err);
                }
            })();
        }
    });

    const classes = useStyles();

    return (
        <div>
            {loading && <CircularProgress />}
            <FormGroup className={classes.form}>
                <TextField
                    label="Username"
                    name="username"
                    placeholder="Insert username"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    InputLabelProps={{ shrink: true }}
                    disabled={loading}
                />
                <TextField
                    label="Email"
                    name="email"
                    placeholder="Insert your email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    InputLabelProps={{ shrink: true }}
                    disabled={loading}
                />
                <TextField
                    label="Password"
                    name="password"
                    placeholder="Insert your password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    InputLabelProps={{ shrink: true }}
                    disabled={loading}
                />
                <Button variant='contained' type='button' onClick={() => formik.handleSubmit()}>Register</Button>
            </FormGroup>
        </div>
    )
};