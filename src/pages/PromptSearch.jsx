import axios from "axios";
import DataTable from "../components/DataTable/DataTable";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../components/SearchBar/SearchBar";
import Loader1 from "../components/Loaders/Loader1";

const PromptSearch = () => {

    const { currentUser } = useAuth()
    const navigate = useNavigate();

    const headers = ["Name", "Type", "Tags"];
    const [dataPrompts, setDataPrompts] = useState([]);
    const [updatePrompts, setUpdatePrompts] = useState(false);
    const [filter, setFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const fetchData = () => {
        if (filter) {
            setIsLoading(true);
            const typeFilter = (Object.keys(filter))[0];
            const query = {
                query: `
                    query {
                        searchPrompts(user:"${currentUser._id}", ${typeFilter}:"${filter[typeFilter]}") {
                            _id
                            name
                            type
                            tags
                            data
                        }
                    }
                `
            };
            const config = {
                headers: {
                    authorization: `Bearer ${sessionStorage.token}`
                }
            };

            axios.post('http://localhost:3002/graphql', query, config)
                .then(response => {
                    const prompts = response.data.data.searchPrompts;
                    // console.log(currentUser._id)
                    prompts?.map(prompt => {
                        prompt.tags = prompt.tags.join(" - ");
                        prompt.type = prompt.type.charAt(0).toUpperCase() + prompt.type.slice(1);
                    });

                    setIsLoading(false);
                    setDataPrompts(prompts);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setDataPrompts([])
        }
    };


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePrompts]);

    const handleRun = (idPrompt) => {
        const currentPrompt = dataPrompts.find(prompt => prompt._id === idPrompt);

        navigate("/prompt/run", {
            state: {
                currentPrompt
            }
        });
    };

    const handleEdit = async (idPrompt) => {
        const currentPrompt = dataPrompts.find(prompt => prompt._id === idPrompt);

        navigate("/prompt/add-edit", {
            state: {
                currentPrompt,
                pathBack: "/search"
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

    const getFilter = (pFilter) => {
        setFilter(pFilter);
        setUpdatePrompts(!updatePrompts);
    };

    return (
        <div className="main-container">
            <div className="header-viewPrompts">
                <div>
                    <h2>Prompts</h2>
                </div>
            </div>

            <SearchBar getFilter={getFilter} />

            <div className="data-viewPrompts">
                {isLoading ? <Loader1 /> :
                    (dataPrompts?.length > 0) ?
                        <DataTable
                            headers={headers}
                            data={dataPrompts}
                            handleRun={handleRun}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                        :
                        filter ?
                            <div
                                style={{ padding: "2em", textAlign: "center", fontSize: "1.2em", fontWeight: "bold", textTransform: "uppercase" }}
                            >No found data</div> :
                            <div
                                style={{ padding: "2em", textAlign: "center", fontSize: "1.2em", fontWeight: "bold", textTransform: "uppercase" }}
                            >First write a Keyword</div>
                }
            </div>
        </div>
    );
};

export default PromptSearch;
