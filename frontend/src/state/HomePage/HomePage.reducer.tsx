import { CategoryType, MovementType } from "../../types";
import { HomePageAction } from "./HomePage.actions";
import { HomePageActionTypes } from "./HomePage.actionTypes";

type HomePageState = {
    movements: MovementType[]
    movementsLoading: boolean
    categories: CategoryType[]
    categoriesLoading: boolean
};

const initialState: HomePageState = {
    movements: [],
    movementsLoading: false,
    categories: [],
    categoriesLoading: false
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
        default: return state
    }
};