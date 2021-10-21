import { Dispatch } from "redux";
import { LoginPageAction } from "./LoginPage.actions";
import axios from "axios";
import { LoginPageActionTypes } from "./LoginPage.actionTypes";
import { usersURL } from "../../const/ServerURL";

export const loginUser = (email: string, password: string) => {
    return async (dispatch: Dispatch<LoginPageAction>) => {
        dispatch({ type: LoginPageActionTypes.LOGIN_BEGIN });

        try {
            const response: any = await axios.post(`${usersURL}/login`, { email, password });
            console.log(response.data);
            const { id, username, token } = response.data;
            dispatch({
                type: LoginPageActionTypes.LOGIN_SUCCESS,
                payload: {
                    id,
                    username,
                    token
                }
            });
        }
        catch (err) {
            dispatch({ type: LoginPageActionTypes.LOGIN_FAILED, payload: { error: err } });
        }
    };
};

export const logout = () => {
    return (dispatch: Dispatch<LoginPageAction>) => {
        dispatch({ type: LoginPageActionTypes.LOGOUT })
    };
};