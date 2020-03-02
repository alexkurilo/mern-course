import {createContext} from "react";

function noop() {};

export const AuthContext = createContext({
    email: null,
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
});