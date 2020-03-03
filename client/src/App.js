import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import {Loader} from './components/Loader';
import {Navbar} from './components/Navbar';
import 'materialize-css';

function App() {
    const {
        login,
        logout,
        token,
        userId,
        email,
        ready,
    } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader/>;
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                token,
                userId,
                email,
                isAuthenticated,
            }}
        >
            <BrowserRouter>
                { isAuthenticated && <Navbar/>}
                <div className={'container'}>
                      {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
