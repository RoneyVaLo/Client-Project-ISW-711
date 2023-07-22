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


export const AuthProvider = ({ children }) => {

    useEffect(() => {
        if (sessionStorage.token) {
            const fetchData = async () => {
                const config = {
                    headers: {
                        authorization: `Bearer ${sessionStorage.token}`
                    }
                };

                const { data } = await axios.get("http://localhost:3001/api/session", config);

                const user = await axios.get(`http://localhost:3001/api/users?id=${data.user}`, config);
                setCurrentUser(user.data)
            };
            fetchData();
        }

    }, [])

    const [currentUser, setCurrentUser] = useState('');

    const login = async (userId) => {
        const config = {
            headers: {
                authorization: `Bearer ${sessionStorage.token}`
            }
        };

        const user = await axios.get(`http://localhost:3001/api/users?id=${userId}`, config);
        setCurrentUser(user.data)

        return;
    };

    const logout = () => {
        sessionStorage.token && sessionStorage.removeItem("token");
        
        // Remove user data
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


