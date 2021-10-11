import { GridRowParams } from "@material-ui/data-grid";
import { CategoryType, ModalAction, MovementType } from "../../types";
import { HomePageAction } from "./HomePage.actions";
import { HomePageActionTypes } from "./HomePage.actionTypes";

type HomePageState = {
    movements: MovementType[]
    movementsLoading: boolean
    categories: CategoryType[]
    categoriesLoading: boolean
    modalOpen: boolean
    modalAction: ModalAction
    modalLoading: boolean
    rowSelected: GridRowParams | null
};

const initialState: HomePageState = {
    movements: [],
    movementsLoading: false,
    categories: [],
    categoriesLoading: false,
    modalOpen: false,
    modalAction: null,
    modalLoading: false,
    rowSelected: null
};

export const HomePageReducer = (state: HomePageState = initialState, action: HomePageAction): HomePageState => {
    switch (action.type) {
        case HomePageActionTypes.FETCH_MOVEMENTS_BEGIN: return {
            ...state,
            movements: [],
            movementsLoading: true
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
        case HomePageActionTypes.SELECT_ROW: {
            const { row } = action.payload;
            return {
                ...state,
                rowSelected: row
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
        case HomePageActionTypes.ADD_MOVEMENT_BEGIN: return {
            ...state,
            modalLoading: true
        };
        case HomePageActionTypes.ADD_MOVEMENT_SUCCESS: return {
            ...state,
            modalOpen: false,
            modalAction: null,
            modalLoading: false
        };
        case HomePageActionTypes.ADD_MOVEMENT_FAILED: {
            const { error } = action.payload;
            console.log(error);
            return state
        }
        default: return state
    }
};