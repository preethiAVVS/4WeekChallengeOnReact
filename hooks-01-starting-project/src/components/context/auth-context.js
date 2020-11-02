import React, {useState} from 'react';
export const AuthContext = React.createContext({
    isAuth: false,
    login: () => {}
});

const AuthContextProvider = (props) => {
    const [authState, setAuth] = useState(false);

    const loginhandler = () => {
        setAuth(true);
    }
    return <AuthContext.Provider value={{isAuth:authState, login: loginhandler }}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContextProvider;