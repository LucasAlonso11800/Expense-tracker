import { combineReducers } from "redux";
import { HomePageReducer } from "./HomePage/HomePage.reducer";
import { LoginPageReducer } from "./LoginPage/LoginPage.reducer";

const RootReducer = combineReducers({
    HomePage: HomePageReducer,
    LoginPage: LoginPageReducer,
});

export default RootReducer

export type State = ReturnType<typeof RootReducer>;