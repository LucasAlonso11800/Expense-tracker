import React from 'react';
// Components
import { Button, FormGroup, TextField } from '@material-ui/core';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovements } from '../state/HomePage/HomePage.actionCreators';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Types
import { State } from '../state/RootReducer';

const validationSchema = yup.object({
    category: yup.string().required('Select an option'),
    type: yup.string().required('Select an option'),
    dateFrom: yup.date().max(yup.ref('dateTo'), "It can't be after the second date").required('Select an option'),
    dateTo: yup.date().max(new Date(), "It can't be a future date").required('Select an option'),
});

export default function TableFilters() {
    const dispatch = useDispatch();
    const { categoriesLoading, categories, accountId } = useSelector((state: State) => state.HomePage);

    const initialDateFrom = new Date().setDate(1);

    const formik = useFormik({
        initialValues: {
            category: 'all',
            type: 'all',
            dateFrom: new Date(initialDateFrom).toISOString().substring(0, 10),
            dateTo: new Date().toISOString().substring(0, 10)
        },
        validationSchema,
        onSubmit: (values) => {
            const { category, type, dateFrom, dateTo } = values;
            dispatch(fetchMovements(type === 'all' ? null : type, dateFrom, dateTo, category === 'all' ? null : parseInt(category), 1, accountId));
        }
    });

    return (
        <FormGroup>
            <TextField
                label="Category"
                name="category"
                select
                SelectProps={{ native: true }}
                variant="filled"
                InputLabelProps={{ shrink: true }}
                disabled={categoriesLoading}
                value={formik.values.category}
                onChange={formik.handleChange}
            >
                <option value={'all'}>All</option>
                {categories.map(cat => {
                    return <option value={cat.id} key={cat.id}>{cat.name}</option>
                })}
            </TextField>
            <TextField
                label="Type"
                name="type"
                select
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: true }}
                variant="filled"
                value={formik.values.type}
                onChange={formik.handleChange}
            >
                <option value="all">All</option>
                <option value="I">In</option>
                <option value="O">Out</option>
            </TextField>
            <TextField
                label="From"
                name="dateFrom"
                type="date"
                variant="filled"
                InputLabelProps={{ shrink: true }}
                value={formik.values.dateFrom}
                onChange={formik.handleChange}
            />
            <TextField
                label="To"
                name="dateTo"
                type="date"
                variant="filled"
                InputLabelProps={{ shrink: true }}
                value={formik.values.dateTo}
                onChange={formik.handleChange}
            />
            <Button type="button" variant="contained" onClick={() => formik.handleSubmit()}>Filter</Button>
        </FormGroup>
    )
};