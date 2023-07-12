import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        console.error("Error creating auth context");
    }

    return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {

    }, []);

    const login = async (userId) => {

        const config = {
            headers: {
                authorization: `Bearer ${sessionStorage.token}`
            }
        }
        const user = await axios.get(`http://localhost:3001/api/users?id=${userId}`, config);
        setCurrentUser(user.data)

        return;
    };

    const logout = () => {
        sessionStorage.token && sessionStorage.removeItem("token");
        // TODO: Eliminar los datos del usuario
        setCurrentUser("");
    };

    return (
        <authContext.Provider
            value={{
                login,
                logout,
                currentUser
            }}
        >
            {children}
        </authContext.Provider>
    );
};


