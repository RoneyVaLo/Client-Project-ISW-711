import axios from "axios";
import DataTable from "../components/DataTable/DataTable";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ViewPrompt = () => {

    const headers = ["Name", "Type", "Tags"];
    const [dataPrompts, setDataPrompts] = useState([]);
    const [idPrompts, setIdPrompts] = useState([]);


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
                    const { name, type, tags } = prompt;
                    const tagsString = tags.join(" - ");
                    const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
                    return [name, formattedType, tagsString];
                });
                setDataPrompts(newDataPrompts);

                const newIdPrompts = response.data.map((prompt) => {
                    const { _id } = prompt;
                    return _id;
                });
                setIdPrompts(newIdPrompts);
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
    const handleRun = (idPrompt) => {
        console.log("Está corriendo");
        console.log("ID:", idPrompt);
    };

    const handleEdit = async (idPrompt) => {
        console.log("Está editando");
        console.log("ID:", idPrompt);
    };

    const handleDelete = async (idPrompt) => {
        const responseUser = confirm("Are you sure to delete?");

        if (responseUser) {
            try {
                const config = {
                    headers: {
                        authorization: `Bearer ${sessionStorage.token}`
                    }
                };

                const promptToDelete = await axios.get(`http://localhost:3001/api/prompts?id=${idPrompt}`, config);
                await axios.delete(`http://localhost:3001/api/prompts?id=${idPrompt}`, config);

                const updatedDataPrompts = dataPrompts.filter(prompt => prompt[0] !== promptToDelete.data.name);
                setDataPrompts(updatedDataPrompts);

                toast.success('Prompt deleted success');
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.error);
            }
        }
    };


    return (
        <div>
            <div className="header-viewPrompts">
                <div>
                    <h2>Prompts</h2>
                </div>
                <div>
                    <button>New</button>
                </div>
            </div>
            <div className="data-viewPrompts">
                <DataTable
                    headers={headers}
                    data={dataPrompts}
                    ids={idPrompts}
                    handleRun={handleRun}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </div>
            <div className="header-viewPrompts remove-margin">
                <div></div>
                <div>
                    <button>New</button>
                </div>
            </div>
        </div>
    );
};

export default ViewPrompt;
