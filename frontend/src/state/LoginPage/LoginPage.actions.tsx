import { LoginPageActionTypes } from "./LoginPage.actionTypes";

type LoginPageLoginBeginAction = {
    type: LoginPageActionTypes.LOGIN_BEGIN
};

type LoginPageLoginSuccessAction = {
    type: LoginPageActionTypes.LOGIN_SUCCESS,
    payload: {
        token: string
        username: string
        id: string
    }
};

type LoginPageLoginFailedAction = {
    type: LoginPageActionTypes.LOGIN_FAILED,
    payload: {
        error: any
    }
};

type LoginPageLogoutAction = {
    type: LoginPageActionTypes.LOGOUT
};

export type LoginPageAction =
    LoginPageLoginBeginAction | LoginPageLoginSuccessAction | LoginPageLoginFailedAction | LoginPageLogoutAction;