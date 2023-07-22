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
        // Check if there is a token in the sessionStorage to determine if the user is authenticated.
        if (sessionStorage.token) {
            // Define an asynchronous function to fetch data from the server.
            const fetchData = async () => {
                // Configure the headers to include the authorization token in the request.
                const config = {
                    headers: {
                        authorization: `Bearer ${sessionStorage.token}`
                    }
                };

                // Make a GET request to the server to fetch session data for the authenticated user.
                const { data } = await axios.get("http://localhost:3001/api/session", config);

                // Use the user ID from the session data to fetch the user's details.
                // Another GET request is made to the server to get the user's information.
                const user = await axios.get(`http://localhost:3001/api/users?id=${data.user}`, config);

                // Set the current user state with the data received from the server.
                setCurrentUser(user.data)
            };

            // Call the fetchData function to initiate the data fetching process.
            fetchData();
        }

    }, [])

    // State variable to hold the current user's data
    const [currentUser, setCurrentUser] = useState('');

    // Function to perform user login using the provided user ID
    const login = async (userId) => {
        try {
            // Check if the user ID is provided before making the request
            if (!userId) {
                throw new Error("User ID is required for login.");
            }

            // Configuration for headers to include the authorization token in the request
            const config = {
                headers: {
                    authorization: `Bearer ${sessionStorage.token}`
                }
            };

            // Make a GET request to the server to fetch the user's data based on the provided user ID
            const response = await axios.get(`http://localhost:3001/api/users?id=${userId}`, config);

            // Set the currentUser state with the data received from the server
            setCurrentUser(response.data);
        } catch (error) {
            // Handle login errors, such as invalid user ID or server errors
            console.log(error.message);
            setCurrentUser(''); // Set the currentUser state
        }
    };

    const logout = () => {
        // Clear the token from sessionStorage unconditionally
        sessionStorage.removeItem("token");

        // Clear the currentUser state
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


