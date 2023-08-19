import axios from "axios";
import DataTable from "../components/DataTable/DataTable";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loader1 from "../components/Loaders/Loader1";
import { useAuth } from "../context/AuthContext";

const ViewUsers = () => {

    const { currentUser } = useAuth();


    const url = 'http://localhost:3001/api/users';
    const { data, loading, error } = useAxios(url);

    const navigate = useNavigate();

    const headers = ["Name", "Email", "Status"];
    const [dataUsers, setDataUsers] = useState([]);
    const [updateUsers, setUpdateUsers] = useState(false);


    // Get the prompts of the database
    useEffect(() => {
        // console.log(currentUser._id)
        const fetchData = async () => {
            try {
                if (data) {
                    const userDataFiltered = data.filter(user => user._id === currentUser._id);
                    setDataUsers((currentUser.role === 'admin') ? data : userDataFiltered);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [data, updateUsers]);

    const handleAdd = () => {
        navigate("/user/add-edit");
    };

    const handleEdit = async (idUser) => {
        const currentUser = dataUsers.find(user => user._id === idUser);

        navigate("/user/add-edit", {
            state: {
                currentUser
            }
        });
    };


    const handleDelete = async (idUser) => {
        if (currentUser.role === 'admin') {
            const responseUser = confirm("Are you sure to delete?");

            if (responseUser) {
                try {
                    // Configuration for headers to include the authorization token in the request
                    const config = {
                        headers: {
                            authorization: `Bearer ${sessionStorage.token}`
                        }
                    };

                    // Create the URL for the request
                    const url = `http://localhost:3001/api/users?id=${idUser}`;

                    // Fetch the details of the user to be deleted from the server using a GET request
                    const { data: userToDelete } = await axios.get(url, config);

                    // Send a DELETE request to the server to delete the user
                    await axios.delete(url, config);

                    // Update the local state (dataUsers) to reflect the deleted user
                    // console.log(userToDelete);
                    const updatedDataUsers = dataUsers.filter(user => user._id !== userToDelete._id);
                    setDataUsers(updatedDataUsers);
                    setUpdateUsers(!updateUsers);

                    // Display a success notification using the "toast" library
                    toast.success('User deleted successfully');
                } catch (error) {
                    // If an error occurs during the request, log the error to the console
                    console.log(error);

                    // Display an error message to the user using the server's response (if available)
                    toast.error(error.response?.data?.error || 'An error occurred while deleting the user.');
                }
            }
        }
    };


    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="main-container">
            <div className="header-viewPrompts">
                <div>
                    <h2>Users</h2>
                </div>
                <div>
                    <button onClick={handleAdd} className="new-btn">New</button>
                </div>
            </div>
            <div className="data-viewPrompts">
                {loading ? <Loader1 /> :
                    (dataUsers.length > 0) ?
                        < DataTable
                            headers={headers}
                            data={dataUsers}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                        :
                        <div>Not have data</div>
                }
            </div>
            <div className="header-viewPrompts">
                <div></div>
                <div>
                    <button onClick={handleAdd} className="new-btn">New</button>
                </div>
            </div>
        </div>
    );
};

export default ViewUsers;
