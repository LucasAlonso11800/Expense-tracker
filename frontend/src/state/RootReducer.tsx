import { combineReducers } from "redux";
import { HomePageReducer } from "./HomePage/HomePage.reducer";

const RootReducer = combineReducers({
    HomePage: HomePageReducer
});

export default RootReducer

export type State = ReturnType<typeof RootReducer>;