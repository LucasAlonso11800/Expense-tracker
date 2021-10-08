import axios, { AxiosResponse } from "axios";
// Types
import { Dispatch } from "redux";
import { CategoryType, MovementType, NumberParam, StringParam } from "../../types";
import { HomePageAction } from "./HomePage.actions";
import { HomePageActionTypes } from "./HomePage.actionTypes";
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