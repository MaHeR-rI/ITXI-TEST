import react, { useState, useEffect, useCallback } from "react";

let logoutTimer;
const AuthContext = react.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});
const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
}
const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationdate');
    const remainingTime = calculateRemainingTime(storedExpirationTime);
    if (remainingTime <= 5000) {
        localStorage.removeItem('token')
        localStorage.removeItem('expirationdate')
        return null;
    }
    return {
        token: storedToken,
        duration: remainingTime
    }
}
export const AuthContextProvider = (props) => {
    let initialToken;
    const dataToken = retrieveStoredToken();
    if (dataToken) {
        initialToken = dataToken.token
    }
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationdate');
        localStorage.removeItem('searchVal');
        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationdate', expirationTime);
        const remainingTime = calculateRemainingTime(expirationTime)
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }
    useEffect(() => {
        if (dataToken) {
            logoutTimer = setTimeout(logoutHandler, dataToken.duration);
        }
    }, [dataToken, logoutHandler]);

    const contextValues = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return < AuthContext.Provider value={contextValues}> {props.children}</AuthContext.Provider>
}
export default AuthContext;