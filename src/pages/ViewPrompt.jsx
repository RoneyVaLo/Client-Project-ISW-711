import axios from "axios";
import DataTable from "../components/DataTable/DataTable";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import Loader1 from "../components/Loaders/Loader1";
import useAxios from "../hooks/useAxios";

const ViewPrompt = () => {

    const auth = useAuth();
    const { currentUser } = auth;
    // console.log(currentUser)

    const url = `http://localhost:3001/api/prompts?user=${currentUser._id}`;
    const { data, loading, error } = useAxios(url);

    const navigate = useNavigate();

    const headers = ["Name", "Type", "Tags"];
    const [dataPrompts, setDataPrompts] = useState([]);
    const [updatePrompts, setUpdatePrompts] = useState(false);


    // Get the prompts of the database
    useEffect(() => {
        if (data) {
            const newDataPrompts = data.map((prompt) => {
                const { type, tags } = prompt;
                const tagsString = [...tags].join(" - ");
                const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
                prompt.type = formattedType;
                prompt.tags = tagsString;

                return prompt;
            });
            setDataPrompts(newDataPrompts);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, updatePrompts]);

    const handleRun = (idPrompt) => {
        const currentPrompt = dataPrompts.find(prompt => prompt._id === idPrompt);

        navigate("/prompt/run", {
            state: {
                currentPrompt
            }
        });
    };

    const handleAdd = () => {
        navigate("/prompt/add-edit");
    };

    const handleEdit = async (idPrompt) => {
        const currentPrompt = dataPrompts.find(prompt => prompt._id === idPrompt);

        navigate("/prompt/add-edit", {
            state: {
                currentPrompt,
                pathBack: "/"
            }
        });
    };

    // Asynchronous function to handle the deletion of a specific prompt
    const handleDelete = async (idPrompt) => {
        // Display a confirmation dialog to ensure the user really wants to delete the prompt
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
                const url = `http://localhost:3001/api/prompts?id=${idPrompt}`;

                // Fetch the details of the prompt to be deleted from the server using a GET request
                const { data: promptToDelete } = await axios.get(url, config);

                // Send a DELETE request to the server to delete the prompt
                await axios.delete(url, config);

                // Update the local state (dataPrompts) to reflect the deleted prompt
                const updatedDataPrompts = dataPrompts.filter(prompt => prompt[0] !== promptToDelete.data.name);
                setUpdatePrompts(true);
                setDataPrompts(updatedDataPrompts);

                // Display a success notification using the "toast" library
                toast.success('Prompt deleted successfully');
            } catch (error) {
                // If an error occurs during the request, log the error to the console
                console.log(error);

                // Display an error message to the user using the server's response (if available)
                toast.error(error.response?.data?.error || 'An error occurred while deleting the prompt.');
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
                    <h2>Prompts</h2>
                </div>
                <div>
                    <button onClick={handleAdd} className="new-btn">New</button>
                </div>
            </div>
            <div className="data-viewPrompts">
                {loading ? <Loader1 /> :
                    (dataPrompts.length > 0) ?
                        <DataTable
                            headers={headers}
                            data={dataPrompts}
                            handleRun={handleRun}
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

export default ViewPrompt;
