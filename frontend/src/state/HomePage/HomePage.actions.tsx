import { MovementType } from "../../types";
import { HomePageActionTypes } from "./HomePage.actionTypes";

type HomePageFetchMovementsBeginAction = {
    type: HomePageActionTypes.FETCH_MOVEMENTS_BEGIN
};

type HomePageFetchMovementsSuccessAction = {
    type: HomePageActionTypes.FETCH_MOVEMENTS_SUCCESS,
    payload: {
        movements: MovementType[]
    }
};
type HomePageFetchMovementsFailedAction = {
    type: HomePageActionTypes.FETCH_MOVEMENTS_FAILED,
    payload: {
        error: any
    }
};

export type HomePageAction = HomePageFetchMovementsBeginAction | HomePageFetchMovementsSuccessAction | HomePageFetchMovementsFailedAction;