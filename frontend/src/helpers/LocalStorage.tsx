import { UserData } from "../types";

export const setLocalStorage = (id: string, username: string, token: string): void => {
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
};

export const getLocalStorage = (): UserData | null => {
    const id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (id && username && token) return { id, username, token };

    return null
};

export const deleteLocalStorage = (): void => localStorage.clear();