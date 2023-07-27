import { useLocation, useNavigate } from "react-router-dom";
import './promptForm.scss';
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import LabelGenerator from "../LabelGenerator/LabelGenerator";

const PromptForm = () => {

    const location = useLocation();

    const currentPrompt = location.state ? location.state.currentPrompt : false;

    const [typePrompt, setTypePrompt] = useState((currentPrompt ? (currentPrompt.type.toLowerCase()) : ""));

    let dataPrompt = (currentPrompt && ((currentPrompt.type.toLowerCase()) === typePrompt)) ? (currentPrompt.data) : false;
    let promptName = (currentPrompt && ((currentPrompt.type.toLowerCase()) === typePrompt)) ? (currentPrompt.name) : "";


    let labelList = (currentPrompt && ((currentPrompt.type.toLowerCase()) === typePrompt)) ? (currentPrompt.tags.split(" - ")) : [];


    const navigate = useNavigate();


    const initializeDataStructure = () => {
        if (currentPrompt) return;

        dataPrompt = {};
        switch (typePrompt) {
            case "edit":
                dataPrompt.model = "text-davinci-edit-001";
                dataPrompt.input = "";
                dataPrompt.instruction = "";
                dataPrompt.temperature = 1;
                break;
            case "images":
                dataPrompt.prompt = "";
                dataPrompt.quantity = 1;
                dataPrompt.size = "1024x1024"
                break;
            case "completion":
                dataPrompt.model = "text-davinci-003"
                dataPrompt.prompt = "";
                dataPrompt.temperature = 1;
                break;
        }
    };

    const handleChangeType = (e) => {
        const { value: type } = e.target;

        if (currentPrompt && ((currentPrompt.type.toLowerCase()) === type) && (dataPrompt)) return;

        dataPrompt = false;
        setTypePrompt(type);
    };

    useEffect(() => {
        if (!currentPrompt || ((currentPrompt.type.toLowerCase()) !== typePrompt)) {
            initializeDataStructure();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typePrompt])


    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        dataPrompt[name] = value;
    };

    const handleChangePromptName = (e) => {
        const { value } = e.target;
        promptName = value;
    };

    // Funciones según tipo de prompt

    const InputEdit = () => (
        <>
            <div className="rows">
                <label htmlFor="input">Input</label>
                <textarea name="input" id="input" placeholder="Type here"
                    defaultValue={dataPrompt.input}
                    onChange={handleChangeInput}
                ></textarea>
            </div>

            <div className="rows">
                <label htmlFor="instruction">Instruction</label>
                <textarea name="instruction" id="instruction" placeholder="Type here"
                    defaultValue={dataPrompt.instruction}
                    onChange={handleChangeInput}
                    required
                ></textarea>
            </div>

            <div className="rows">
                <label htmlFor="temperature">Temperature</label>
                <input type="number" name="temperature" id="temperature" min={0.1} max={2}
                    step="0.1"
                    defaultValue={(currentPrompt && ((currentPrompt.type.toLowerCase()) === typePrompt)) ?
                        Number(currentPrompt.data.temperature) : 1}
                    onChange={handleChangeInput}
                />
            </div>
        </>
    );

    const InputImages = () => (
        <>
            <div className="rows">
                <label htmlFor="prompt">Prompt</label>
                <textarea name="prompt" id="prompt" placeholder="Type here"
                    defaultValue={dataPrompt.prompt}
                    onChange={handleChangeInput}
                    required
                ></textarea>
            </div>

            <div className="rows">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity" id="quantity" min={1} max={10}
                    defaultValue={(currentPrompt && ((currentPrompt.type.toLowerCase()) === typePrompt)) ?
                        Number(currentPrompt.data.quantity) : 1}
                    onChange={handleChangeInput}
                />
            </div>

            <div className="rows">
                <label htmlFor="size">Size</label>
                <select name="size" id="size"
                    onChange={handleChangeInput}
                    defaultValue={(currentPrompt && ((currentPrompt.type.toLowerCase()) === typePrompt)) ?
                        (currentPrompt.data.size) : "1024x1024"}
                >
                    <option value="256x256">256x256</option>
                    <option value="512x512">512x512</option>
                    <option value="1024x1024">1024x1024</option>
                </select>
            </div>
        </>
    );

    const InputCompletion = () => (
        <>
            <div className="rows">
                <label htmlFor="prompt">Prompt</label>
                <textarea name="prompt" id="prompt" placeholder="Type here"
                    defaultValue={dataPrompt.prompt}
                    onChange={handleChangeInput}
                    required
                ></textarea>
            </div>

            <div className="rows">
                <label htmlFor="temperature">Temperature</label>
                <input type="number" name="temperature" id="temperature" min={0.1} max={2} step="0.1"
                    defaultValue={(currentPrompt && ((currentPrompt.type.toLowerCase()) === typePrompt)) ?
                        Number(currentPrompt.data.temperature) : 1}
                    onChange={handleChangeInput}
                />
            </div>
        </>
    );

    // Renderiza los inputs según el tipo
    const renderInputs = () => {
        if (typePrompt === 'edit') {
            return <InputEdit />;
        } else if (typePrompt === 'images') {
            return <InputImages />;
        } else if (typePrompt === 'completion') {
            return <InputCompletion />;
        } else {
            return null; // Si no se ha seleccionado una opción o la opción es inválida
        }
    };


    const addLabel = (pLabelList) => {
        labelList = pLabelList;
    };


    const addPrompt = (body, config) => {
        axios.post('http://localhost:3001/api/prompts', body, config)
            .then((response) => {
                toast.success(`Prompt ${response.statusText}`);
                navigate("/");
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.statusText);
            });
    };

    const editPrompt = (body, config) => {
        axios.patch(`http://localhost:3001/api/prompts?id=${currentPrompt._id}`, body, config)
            .then(response => {
                console.log(response.statusText);
                toast.success("Prompt Updated");
                navigate("/");
            })
            .catch(err => {
                toast.error(err.response.statusText);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { inputName, types } = e.target;

        if (types.value === "") return toast.error("You need to select a type!!");

        if (labelList.length <= 0) return toast.error("You need to add tags!!");


        const body = {
            name: ((promptName !== "") ? promptName : (inputName.value)),
            type: types.value,
            data: dataPrompt,
            tags: labelList
        };

        const config = {
            headers: {
                authorization: `Bearer ${sessionStorage.token}`
            }
        };
        if (!currentPrompt) addPrompt(body, config);
        else editPrompt(body, config);
    };


    return (
        <div className="prompt-form">
            <h2>Prompts</h2>

            <form onSubmit={handleSubmit}>
                <h3>{`${currentPrompt ? "Update" : "Add New"} Prompt`}</h3>

                <div className="row">
                    <div className="rows name">
                        <label htmlFor="inputName">Name</label>
                        <input type="text" name="inputName" required
                            defaultValue={promptName}
                            onChange={handleChangePromptName}
                        />
                    </div>

                    <div className="rows type">
                        <label htmlFor="types">Type</label>
                        <select name="types" id="types" onChange={handleChangeType}
                            defaultValue={currentPrompt ? (currentPrompt.type.toLowerCase()) : ""}
                        >
                            <option value="">Select</option>
                            <option value="edit">Edit</option>
                            <option value="images">Images</option>
                            <option value="completion">Completion</option>
                        </select>
                    </div>
                </div>

                {renderInputs()}

                <div className="rows">
                    <label htmlFor="">Labels</label>
                    <LabelGenerator addLable={addLabel} pLabelList={labelList} />
                </div>

                <div className="row buttons">
                    <button className="add-prompt">{`${currentPrompt ? "Update" : "Add"} prompt`}</button>
                    <button className="cancel" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default PromptForm;
