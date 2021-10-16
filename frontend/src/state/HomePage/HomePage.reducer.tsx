import { GridRowParams } from "@material-ui/data-grid";
import { AccountType, CategoryType, ModalAction, MovementType } from "../../types";
import { HomePageAction } from "./HomePage.actions";
import { HomePageActionTypes } from "./HomePage.actionTypes";

type HomePageState = {
    movements: MovementType[]
    movementsLoading: boolean
    categories: CategoryType[]
    categoriesLoading: boolean
    accounts: AccountType[]
    accountsLoading: boolean
    modalOpen: boolean
    modalAction: ModalAction
    modalLoading: boolean
    rowSelected: GridRowParams | null
    categorySelected: GridRowParams | null
    accountSelected: GridRowParams | null
    accountId: number
};

const initialState: HomePageState = {
    movements: [],
    movementsLoading: false,
    categories: [],
    categoriesLoading: false,
    accounts: [],
    accountsLoading: false,
    modalOpen: false,
    modalAction: null,
    modalLoading: false,
    rowSelected: null,
    categorySelected: null,
    accountSelected: null,
    accountId: 1
};

export const HomePageReducer = (state: HomePageState = initialState, action: HomePageAction): HomePageState => {
    switch (action.type) {
        case HomePageActionTypes.FETCH_MOVEMENTS_BEGIN: return {
            ...state,
            movements: [],
            movementsLoading: true,
        };
        case HomePageActionTypes.FETCH_MOVEMENTS_SUCCESS: {
            const { movements } = action.payload;
            return {
                ...state,
                movements,
                movementsLoading: false
            };
        };
        case HomePageActionTypes.FETCH_MOVEMENTS_FAILED: {
            const { error } = action.payload;
            console.log(error)
            return state
        };
        case HomePageActionTypes.FETCH_CATEGORIES_BEGIN: return {
            ...state,
            categories: [],
            categoriesLoading: true
        };
        case HomePageActionTypes.FETCH_CATEGORIES_SUCCESS: {
            const { categories } = action.payload;
            return {
                ...state,
                categories,
                categoriesLoading: false
            };
        };
        case HomePageActionTypes.FETCH_CATEGORIES_FAILED: {
            const { error } = action.payload;
            console.log(error);
            return state
        };
        case HomePageActionTypes.FETCH_ACCOUNTS_BEGIN: return {
            ...state,
            accountsLoading: true,
            accounts: []
        };
        case HomePageActionTypes.FETCH_ACCOUNTS_SUCCESS: {
            const { accounts } = action.payload;
            return {
                ...state,
                accounts,
                accountsLoading: false
            };
        };
        case HomePageActionTypes.FETCH_ACCOUNTS_FAILED: {
            const { error } = action.payload;
            console.log(error);
            return state
        };
        case HomePageActionTypes.SELECT_ROW: {
            const { row } = action.payload;
            return {
                ...state,
                rowSelected: row
            }
        };
        case HomePageActionTypes.SELECT_CATEGORY: {
            const { row } = action.payload;
            return {
                ...state,
                categorySelected: row
            }
        };
        case HomePageActionTypes.SELECT_ACCOUNT: {
            const { row } = action.payload;
            return {
                ...state,
                accountSelected: row
            }
        };
        case HomePageActionTypes.OPEN_MODAL: {
            const { modalAction } = action.payload;
            return {
                ...state,
                modalAction,
                modalOpen: true,
            }
        };
        case HomePageActionTypes.CLOSE_MODAL: return {
            ...state,
            modalAction: null,
            modalOpen: false,
        };
        case HomePageActionTypes.MUTATE_BEGIN: return {
            ...state,
            modalLoading: true
        };
        case HomePageActionTypes.MUTATE_MOVEMENT_SUCCESS: return {
            ...state,
            modalOpen: false,
            modalAction: null,
            modalLoading: false,
            rowSelected: null
        };
        case HomePageActionTypes.MUTATE_CATEGORY_SUCCESS: return {
            ...state,
            modalAction: 'CategoriesTable',
            modalLoading: false,
            categorySelected: null
        };
        case HomePageActionTypes.MUTATE_ACCOUNT_SUCCESS: return {
            ...state,
            modalAction: 'AccountsTable',
            modalLoading: false,
            accountSelected: null
        };
        case HomePageActionTypes.MUTATE_FAILED: {
            const { error } = action.payload;
            console.log(error);
            return state
        }
        case HomePageActionTypes.CHANGE_SELECTED_ACCOUNT: return {
            ...state,
            accountId: action.payload.accountId,
        }
        default: return state
    }
};