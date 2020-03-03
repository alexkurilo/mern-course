import {useCallback, useState, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const local = JSON.parse(localStorage.getItem(storageName));
    const [token, setToken] = useState(local ? local.token : null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(local ? local.userId : null);
    const [email, setEmail] = useState(local ? local.email : null);

    const login = useCallback((jwtToken, id, email) => {
        setToken(jwtToken);
        setUserId(id);
        setEmail(email);
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken,
            email,
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setEmail(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userId, data.email);
        }
        setReady(true);
    }, [login]);

    return {
        login,
        logout,
        token,
        userId,
        email,
        ready,
    };
};