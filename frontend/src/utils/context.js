import React, {useState, useEffect, createContext} from 'react';
import {apiUrl} from './constants';
import { jwtDecode } from "jwt-decode";

export const storeData = (type, value) => {
        localStorage.setItem(type, JSON.stringify(value))
}

export const fetchData = (type) => {
        if(localStorage.getItem(type)) return JSON.parse(localStorage.getItem(type))
        return ''
}

const MainContext = createContext();

const MainContextProvider = ({children}) => {

        const [token, setToken] = useState(fetchData('token') || '');
        const [user, setUser] = useState(fetchData('user') || {});

        useEffect(() => {
                storeData("token", token);
                if(token?.length) {
                        const decoded = jwtDecode(token || "");
                        setUser(decoded);
                }
                else {
                       setUser({});
                }
        }, [token]);

        useEffect(() => {storeData("user", user)}, [user])

        return (
                <MainContext.Provider
                        value={{
                                storeData,
                                fetchData,
                                token,
                                setToken,
                                user,
                                setUser
                        }}
                >
                        {children}
                </MainContext.Provider>
        )
}

export { MainContext, MainContextProvider };