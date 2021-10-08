import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomePageActionCreators from '../state/HomePage/HomePage.actionCreators';
import { State } from '../state/RootReducer'

export default function HomePage() {
    const dispatch = useDispatch();
    const state = useSelector((state: State) => state.HomePage);
    console.log(state);
    const { fetchMovements } = bindActionCreators(HomePageActionCreators, dispatch);
    useEffect(() => {
        fetchMovements(null,
            null,
            null,
            null,
            1)
    }, [])
    return (
        <div>

        </div>
    )
};