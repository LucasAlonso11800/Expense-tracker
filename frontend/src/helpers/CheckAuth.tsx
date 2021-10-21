import { UserData } from "../types";

export const checkAuth = (user: UserData | null) => {
    if (user && window.location.pathname === '/') window.location.assign('/home');
    if (!user && window.location.pathname === '/home') window.location.assign('/');
};