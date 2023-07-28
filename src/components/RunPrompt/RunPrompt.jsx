import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import './runPrompt.scss';
import { useState } from "react";

const RunPrompt = ({ currentPrompt }) => {

    const { _id, name, type, data } = currentPrompt;

    const navigate = useNavigate();

    const [promptResponse, setPromptResponse] = useState(false);

    const handleRunPrompt = () => {
        // console.log(data);
        let url = "http://localhost:3001/api/";
        let body = {
            data
        };

        if ((type.toLowerCase()) === "edit") {
            url += "edit";
        } else if ((type.toLowerCase()) === "images") {
            url += "image";
        } else if ((type.toLowerCase()) === "completion") {
            url += "completion";
        }

        const config = {
            headers: {
                authorization: `Bearer ${sessionStorage.token}`
            }
        };


        axios.post(url, body, config)
            .then(async (response) => {
                toast.success("Run successful");
                // console.log(response.data);

                body = {
                    results: response.data
                };
                await axios.patch(`http://localhost:3001/api/prompts?id=${_id}`, body, config)

                setPromptResponse(response.data);
            })
            .catch(err => {
                console.log(err)
                toast.error("Error running the prompt");
            });
    };

    return (
        <div className="run-prompt">
            <div>
                <h2>Prompts</h2>
            </div>
            <div className="main-container">
                <h2>{name}</h2>

                <section className="data">
                    <div className="data__row">
                        <span>Type:</span>
                        <span>{type}</span>
                    </div>

                    <div className="data__rows">
                        <span>{data.input ? "Input" : "Prompt"}</span>
                        <span>{data.input ? data.input : data.prompt}</span>
                    </div>

                    {(type.toLowerCase()) !== "completion" &&
                        <div className="data__rows">
                            <span>{data.instruction ? "Instructions" : "Size"}</span>
                            <span>{data.instruction ? data.instruction : data.size}</span>
                        </div>
                    }

                    {data.n &&
                        <div className="data__row">
                            <span>Quantity:</span>
                            <span>{data.n}</span>
                        </div>
                    }
                </section>

                <section className="run">
                    <button onClick={handleRunPrompt}>
                        Run
                        <ion-icon name="play-circle-sharp"></ion-icon>
                    </button>
                </section>

                <section className="results">
                    <h3>Response</h3>
                    {/*TODO: Estilizar las imagenes */}
                    {((type.toLowerCase()) !== "images") ?
                        <textarea name="" id="" value={promptResponse ? promptResponse.choices[0].text : ""}
                            disabled
                        ></textarea>
                        :
                        <div className="results__images">
                            {promptResponse && promptResponse.data.map((image, i) => {
                                return <img src={`${image.url}`} alt="IA Image" key={i} />;
                            })}
                        </div>
                    }
                </section>
                <section className="back">
                    <button onClick={() => navigate("/")}>Back</button>
                </section>
            </div>
        </div>
    );
};

export default RunPrompt;
