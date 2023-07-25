import axios from "axios";
import DataTable from "../components/DataTable/DataTable";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ViewPrompt = () => {

    const navigate = useNavigate();

    const headers = ["Name", "Type", "Tags"];
    const [dataPrompts, setDataPrompts] = useState([]);


    // Get the prompts of the database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        authorization: `Bearer ${sessionStorage.token}`
                    }
                };
                const response = await axios.get("http://localhost:3001/api/prompts", config);
                // console.log(response.data);
                const newDataPrompts = response.data.map((prompt) => {
                    // console.log(prompt.tags)
                    // const { name, type, tags } = prompt;
                    const { type, tags } = prompt;
                    const tagsString = tags.join(" - ");
                    const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
                    prompt.type = formattedType;
                    prompt.tags = tagsString;
                    // console.log(prompt.tags)
                    return prompt; // [name, formattedType, tagsString];
                });
                setDataPrompts(newDataPrompts);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // console.log({idPrompts});

    /*
    ? Estos son los datos para la vista de usuarios 
    * const headers2 = ["Name", "Email", "Status"];
    * const data2 = [["Bladimir", "bladimir.ab@gmail.com", "Pending"], ["Fulanito", "detal@gmail.com", "Active"]]; 
    */

    // TODO: Gestionar la redirección de páginas y las demás gestiones demás
    // TODO: Crear las vistas para poder hacer los demás procedimientos
    const handleRun = (idPrompt) => {
        // console.log("Está corriendo");
        // console.log("ID:", idPrompt);

        const currentPrompt = dataPrompts.filter(prompt => prompt._id === idPrompt);
        // console.log(currentPrompt);

        navigate("/prompt/run", {
            state: {
                currentPrompt: currentPrompt[0]
            }
        });
    };

    const handleAdd = () => {
        navigate("/prompt/add-edit");
    };

    const handleEdit = async (idPrompt) => {
        console.log("Está editando");
        console.log("ID:", idPrompt);
        navigate("/prompt/add-edit");
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
                <DataTable
                    headers={headers}
                    data={dataPrompts}
                    handleRun={handleRun}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
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
