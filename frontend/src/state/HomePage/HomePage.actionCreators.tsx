import axios, { AxiosResponse } from "axios";
// Types
import { Dispatch } from "redux";
import { CategoryType, ModalAction, MovementType, NumberParam, StringParam } from "../../types";
import { HomePageAction } from "./HomePage.actions";
import { HomePageActionTypes } from "./HomePage.actionTypes";
import { GridRowParams } from "@material-ui/data-grid";
// Const
import { categoriesURL, movementsURL } from "../../const/ServerURL";

export const fetchMovements = (type: StringParam, dateFrom: string, dateTo: string, categoryId: NumberParam, userId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.FETCH_MOVEMENTS_BEGIN });
        try {
            const response: AxiosResponse = await axios.post(`${movementsURL}/get`, { type, dateFrom, dateTo, categoryId, userId });
            const movements: MovementType[] = response.data;

            dispatch({ type: HomePageActionTypes.FETCH_MOVEMENTS_SUCCESS, payload: { movements } })
        }
        catch (err: any) {
            dispatch({ type: HomePageActionTypes.FETCH_MOVEMENTS_FAILED, payload: err })
        }
    };
};

export const fetchCategories = (userId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.FETCH_CATEGORIES_BEGIN });
        try {
            const response: AxiosResponse = await axios.post(`${categoriesURL}/get`, { userId });
            const categories: CategoryType[] = response.data;

            dispatch({ type: HomePageActionTypes.FETCH_CATEGORIES_SUCCESS, payload: { categories } })
        }
        catch (err: any) {
            dispatch({ type: HomePageActionTypes.FETCH_CATEGORIES_FAILED, payload: { error: err } })
        }
    }
};

export const selectRow = (row: GridRowParams | null) => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({
            type: HomePageActionTypes.SELECT_ROW,
            payload: { row }
        })
    }
};

export const openModal = (modalAction: ModalAction) => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({
            type: HomePageActionTypes.OPEN_MODAL,
            payload: {
                modalAction
            }
        })
    }
};

export const closeModal = () => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.CLOSE_MODAL })
    }
};

export const addMovement = (type: string, amount: number, date: string, description: string, categoryId: number, userId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_BEGIN })
        try {
            await axios.post(`${movementsURL}/add`, {
                type, amount, date, description, categoryId, userId
            });
            dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_FAILED, payload: { error: err } })
        }
    }
};

export const editMovement = (movementId: number, type: string, amount: number, date: string, description: string, categoryId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_BEGIN })
        try {
            await axios.post(`${movementsURL}/update`, {
                id: movementId, type, amount, date, description, categoryId
            });
            dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_FAILED, payload: { error: err } })
        }
    }
};

export const deleteMovement = (movementId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_BEGIN })
        try {
            await axios.post(`${movementsURL}/delete`, { id: movementId });
            dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_FAILED, payload: { error: err } })
        }
    }
};