import axios, { AxiosResponse } from "axios";
// Types
import { Dispatch } from "redux";
import { AccountType, CategoryType, ModalAction, MovementType, NumberParam, StringParam } from "../../types";
import { HomePageAction } from "./HomePage.actions";
import { HomePageActionTypes } from "./HomePage.actionTypes";
import { GridRowParams } from "@material-ui/data-grid";
// Const
import { accountsURL, categoriesURL, movementsURL } from "../../const/ServerURL";
// Helpers
import { getLocalStorage } from "../../helpers/LocalStorage";

const userId = getLocalStorage() ? getLocalStorage()?.id : null;

export const fetchMovements = (type: StringParam, dateFrom: string, dateTo: string, categoryId: NumberParam, accountId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.FETCH_MOVEMENTS_BEGIN });
        try {
            const response: AxiosResponse = await axios.post(`${movementsURL}/get`, { type, dateFrom, dateTo, categoryId, userId, accountId });
            const movements: MovementType[] = response.data;

            dispatch({ type: HomePageActionTypes.FETCH_MOVEMENTS_SUCCESS, payload: { movements } })
        }
        catch (err: any) {
            dispatch({ type: HomePageActionTypes.FETCH_MOVEMENTS_FAILED, payload: err })
        }
    };
};

export const fetchCategories = () => {
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

export const fetchAccounts = () => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.FETCH_ACCOUNTS_BEGIN });
        try {
            const response: AxiosResponse = await axios.post(`${accountsURL}/get`, { userId });
            const accounts: AccountType[] = response.data;

            dispatch({ type: HomePageActionTypes.FETCH_ACCOUNTS_SUCCESS, payload: { accounts } })
        }
        catch (err: any) {
            dispatch({ type: HomePageActionTypes.FETCH_ACCOUNTS_FAILED, payload: { error: err } })
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

export const selectCategory = (row: GridRowParams | null) => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({
            type: HomePageActionTypes.SELECT_CATEGORY,
            payload: { row }
        })
    }
};

export const selectAccount = (row: GridRowParams | null) => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({
            type: HomePageActionTypes.SELECT_ACCOUNT,
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

export const addMovement = (type: string, amount: number, date: string, description: string, categoryId: number, accountId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_BEGIN })
        try {
            await axios.post(`${movementsURL}/add`, {
                type, amount, date, description, categoryId, userId, accountId
            });
            dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_FAILED, payload: { error: err } })
        }
    }
};

export const editMovement = (movementId: number, type: string, amount: number, date: string, description: string, categoryId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_BEGIN })
        try {
            await axios.post(`${movementsURL}/update`, {
                id: movementId, type, amount, date, description, categoryId
            });
            dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_FAILED, payload: { error: err } })
        }
    }
};

export const deleteMovement = (movementId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_BEGIN })
        try {
            await axios.post(`${movementsURL}/delete`, { id: movementId });
            dispatch({ type: HomePageActionTypes.MUTATE_MOVEMENT_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_FAILED, payload: { error: err } })
        }
    }
};

export const addCategory = (name: string) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_BEGIN })
        try {
            await axios.post(`${categoriesURL}/add`, { name, userId });
            dispatch({ type: HomePageActionTypes.MUTATE_CATEGORY_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_FAILED, payload: { error: err } })
        }
    }
};

export const editCategory = (categoryId: number, name: string) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_BEGIN })
        try {
            await axios.post(`${categoriesURL}/update`, { id: categoryId, name });
            dispatch({ type: HomePageActionTypes.MUTATE_CATEGORY_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_FAILED, payload: { error: err } })
        }
    }
};

export const deleteCategory = (categoryId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_BEGIN })
        try {
            await axios.post(`${categoriesURL}/delete`, { id: categoryId, userId });
            dispatch({ type: HomePageActionTypes.MUTATE_ACCOUNT_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_FAILED, payload: { error: err } })
        }
    }
};

export const addAccount = (name: string) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_BEGIN })
        try {
            await axios.post(`${accountsURL}/add`, { name, userId });
            dispatch({ type: HomePageActionTypes.MUTATE_ACCOUNT_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_FAILED, payload: { error: err } })
        }
    }
};

export const editAccount = (accountId: number, name: string) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_BEGIN })
        try {
            await axios.post(`${accountsURL}/update`, { id: accountId, name });
            dispatch({ type: HomePageActionTypes.MUTATE_ACCOUNT_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_FAILED, payload: { error: err } })
        }
    }
};

export const deleteAccount = (accountId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.MUTATE_BEGIN })
        try {
            await axios.post(`${accountsURL}/delete`, { id: accountId, userId });
            dispatch({ type: HomePageActionTypes.MUTATE_ACCOUNT_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.MUTATE_FAILED, payload: { error: err } })
        }
    }
};

export const changeSelectedAccount = (accountId: number) => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.CHANGE_SELECTED_ACCOUNT, payload: { accountId } })
    }
};