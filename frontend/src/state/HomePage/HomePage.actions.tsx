import { GridRowParams } from "@material-ui/data-grid";
import { AccountType, CategoryType, ModalAction, MovementType } from "../../types";
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

type HomePageFetchAccountsBeginAction = {
    type: HomePageActionTypes.FETCH_ACCOUNTS_BEGIN
};

type HomePageFetchAccountsSuccessAction = {
    type: HomePageActionTypes.FETCH_ACCOUNTS_SUCCESS,
    payload: {
        accounts: AccountType[]
    }
};
type HomePageFetchAccountsFailedAction = {
    type: HomePageActionTypes.FETCH_ACCOUNTS_FAILED,
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

type HomePageMutateMovementBeginAction = {
    type: HomePageActionTypes.MUTATE_MOVEMENT_BEGIN
};

type HomePageMutateMovementSuccessAction = {
    type: HomePageActionTypes.MUTATE_MOVEMENT_SUCCESS
};

type HomePageMutateMovementFailedAction = {
    type: HomePageActionTypes.MUTATE_MOVEMENT_FAILED,
    payload: {
        error: any
    }
};

type HomePageChangeSelectedAccountAction = {
    type: HomePageActionTypes.CHANGE_SELECTED_ACCOUNT,
    payload: {
        accountId: number
    }
};

export type HomePageAction =
    HomePageFetchMovementsBeginAction |
    HomePageFetchMovementsSuccessAction |
    HomePageFetchMovementsFailedAction |
    HomePageFetchCategoriesBeginAction |
    HomePageFetchCategoriesSuccessAction |
    HomePageFetchCategoriesFailedAction |
    HomePageFetchAccountsBeginAction |
    HomePageFetchAccountsSuccessAction |
    HomePageFetchAccountsFailedAction |
    HomePageSelectRowAction |
    HomePageOpenModalAction |
    HomePageCloseModalAction |
    HomePageMutateMovementBeginAction | 
    HomePageMutateMovementSuccessAction |
    HomePageMutateMovementFailedAction |
    HomePageChangeSelectedAccountAction
    ;