import axios, { AxiosResponse } from "axios";
// Types
import { Dispatch } from "redux";
import { MovementType, NumberParam, StringParam } from "../../types";
import { HomePageAction } from "./HomePage.actions";
import { HomePageActionTypes } from "./HomePage.actionTypes";
// Const
import { movementsURL } from "../../const/ServerURL";

export const fetchMovements = (type: StringParam, amount: StringParam, dateFrom: string, dateTo: string, categoryId: NumberParam, userId: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.FETCH_MOVEMENTS_BEGIN });
        try {
            const response: AxiosResponse = await axios.post(`${movementsURL}/get`, { type, amount, dateFrom, dateTo, categoryId, userId });
            const movements: MovementType[] = response.data;

            console.log(movements);
            dispatch({ type: HomePageActionTypes.FETCH_MOVEMENTS_SUCCESS, payload: { movements } })
        }
        catch (err: any) {
            dispatch({ type: HomePageActionTypes.FETCH_MOVEMENTS_FAILED, payload: err })
        }
    };
};