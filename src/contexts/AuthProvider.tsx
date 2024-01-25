import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthContextType {
    authToken: string;
    signin: (authToken: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
};
const authProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
        authProvider.isAuthenticated = true;
        setTimeout(callback, 100);
    },
    signout(callback: VoidFunction) {
        authProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    }
}
const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // console.log("auth_token",localStorage.getItem("auth_token"));
    let [authToken, setAuthToken] = React.useState<any>(localStorage.getItem("auth_token")? localStorage.getItem("auth_token") : '');

    let signin = (newToken: string, callback: VoidFunction) => {
        return authProvider.signin(() => {
            setAuthToken(newToken);
            callback();
        });
    };

    let signout = (callback: VoidFunction) => {
        return authProvider.signout(() => {
            setAuthToken('');
            localStorage.setItem("auth_token", '');
            callback();
        });
    };

    let value = { authToken, signin, signout };

    return (
        <AuthContext.Provider value={ value }> { children } </AuthContext.Provider>
    );
};

export default AuthProvider;

export function useAuth() {
    return React.useContext(AuthContext);
}

export const RequireAuth = ({children} : {children: JSX.Element}) => {
    let auth = useAuth();
    let location = useLocation();
    console.log(`token : ${auth.authToken}`);
    if (!auth.authToken) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }
    return children;
};



