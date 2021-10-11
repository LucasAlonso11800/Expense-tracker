import { GridRowParams } from "@material-ui/data-grid";
import { CategoryType, ModalAction, MovementType } from "../../types";
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

type HomePageSelectRowAction = {
    type: HomePageActionTypes.SELECT_ROW,
    payload: {
        row: GridRowParams | null
    }
};

type HomePageOpenModalAction = {
    type: HomePageActionTypes.OPEN_MODAL,
    payload: {
        modalAction: ModalAction
    }
};

type HomePageCloseModalAction = {
    type: HomePageActionTypes.CLOSE_MODAL
};

type HomePageAddMovementBeginAction = {
    type: HomePageActionTypes.ADD_MOVEMENT_BEGIN
};

type HomePageAddMovementSuccessAction = {
    type: HomePageActionTypes.ADD_MOVEMENT_SUCCESS
};

type HomePageAddMovementFailedAction = {
    type: HomePageActionTypes.ADD_MOVEMENT_FAILED,
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
    HomePageFetchCategoriesFailedAction |
    HomePageSelectRowAction |
    HomePageOpenModalAction |
    HomePageCloseModalAction |
    HomePageAddMovementBeginAction | 
    HomePageAddMovementSuccessAction |
    HomePageAddMovementFailedAction
    ;