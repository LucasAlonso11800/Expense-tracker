import { deleteLocalStorage, setLocalStorage } from "../../helpers/LocalStorage";
import { LoginPageAction } from "./LoginPage.actions";
import { LoginPageActionTypes } from "./LoginPage.actionTypes";

type LoginPageState = {
    loading: boolean
    error: string | null
};

const initialState: LoginPageState = {
    loading: false,
    error: null
};

export const LoginPageReducer = (state: LoginPageState = initialState, action: LoginPageAction): LoginPageState => {
    switch (action.type) {
        case LoginPageActionTypes.LOGIN_BEGIN: return {
            ...state,
            loading: true
        };
        case LoginPageActionTypes.LOGIN_SUCCESS: {
            const { id, username, token } = action.payload
            setLocalStorage(id, username, token);
            window.location.assign('/home');
            return {
                ...state,
                loading: false
            }
        };
        case LoginPageActionTypes.LOGIN_FAILED: {
            const { error } = action.payload;
            return {
                loading: false,
                error
            }
        };
        case LoginPageActionTypes.LOGOUT:
            deleteLocalStorage();
            return state
        default: return state
    }
};