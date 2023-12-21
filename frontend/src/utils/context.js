import React, {useState, useEffect, createContext} from 'react';
import {apiUrl} from './constants';
import { jwtDecode } from "jwt-decode";
import { message } from 'antd';

export const storeData = (type, value) => {
        localStorage.setItem(type, JSON.stringify(value))
}

export const fetchData = (type) => {
        if(localStorage.getItem(type)) return JSON.parse(localStorage.getItem(type))
        return ''
}

const MainContext = createContext();

const MainContextProvider = ({children}) => {

        const [theme, setTheme] = useState(fetchData('theme') || 'light');
        const [token, setToken] = useState(fetchData('token') || '');
        const [user, setUser] = useState(fetchData('user') || {});
        const [reminders, setReminders] = useState([]);

        const [remindersLoading, setRemindersLoading] = useState(false);

        const getRemindersHandler = () => {
                setRemindersLoading(true);
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}`);

                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };

                fetch(`${apiUrl}api/reminders`, requestOptions)
                .then(response => response.json())
                .then(res => {
                        setRemindersLoading(false);
                        if(res?.success) {
                                setReminders(res?.data);
                        }
                        else {
                                message.error(res?.message);
                        }
                })
                .catch(error => {
                        setRemindersLoading(false);
                        console.log('error', error);
                });
        }

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
        useEffect(() => {storeData("theme", theme)}, [theme])

        return (
                <MainContext.Provider
                        value={{
                                theme,
                                setTheme,
                                storeData,
                                fetchData,
                                token,
                                setToken,
                                user,
                                setUser,
                                getRemindersHandler,
                                remindersLoading,
                                reminders
                        }}
                >
                        {children}
                </MainContext.Provider>
        )
}

export { MainContext, MainContextProvider };