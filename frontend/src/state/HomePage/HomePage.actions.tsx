import { CategoryType, MovementType } from "../../types";
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

type HomePageFetchCategoriesBeginAction = {
    type: HomePageActionTypes.FETCH_CATEGORIES_BEGIN
};

type HomePageFetchCategoriesSuccessAction = {
    type: HomePageActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: {
        categories: CategoryType[]
    }
};

type HomePageFetchCategoriesFailedAction = {
    type: HomePageActionTypes.FETCH_CATEGORIES_FAILED,
    payload: {
        error: any
    }
};

export type HomePageAction =
    HomePageFetchMovementsBeginAction |
    HomePageFetchMovementsSuccessAction |
    HomePageFetchMovementsFailedAction |
    HomePageFetchCategoriesBeginAction |
    HomePageFetchCategoriesSuccessAction |
    HomePageFetchCategoriesFailedAction
    ;