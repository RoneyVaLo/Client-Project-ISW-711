import { useNavigate } from "react-router-dom";
import './runPrompt.scss';

const RunPrompt = ({ type, data }) => {

    const navigate = useNavigate();
    return (
        <div className="run-prompt">
            <div>
                <h2>Prompts</h2>
            </div>
            <div className="main-container">
                <h2>Prompt de Prueba</h2>

                <section className="data">
                    <div className="data__row">
                        <span>Type:</span>
                        <span>{type}</span>
                    </div>

                    <div className="data__rows">
                        <span>{data.input ? "Input" : "Prompt"}</span>
                        <span>{data.input ? data.input : data.prompt}</span>
                    </div>

                    <div className="data__rows">
                        <span>{data.instruction ? "Instructions" : "Size"}</span>
                        <span>{data.instruction ? data.instruction : data.size}</span>
                    </div>

                    {data.n &&
                        <div className="data__row">
                            <span>Quantity:</span>
                            <span>{data.n}</span>
                        </div>
                    }
                </section>

                <section className="run">
                    <button>
                        Run
                        <ion-icon name="play-circle-sharp"></ion-icon>
                    </button>
                </section>

                <section className="results">
                    <h3>Response</h3>
                    {/*TODO: Agregar el espacio para la imagen si es tipo IMAGES */}
                    <textarea name="" id="" placeholder="The response of the API goes here here"></textarea>
                </section>
                <section className="back">
                    <button onClick={() => navigate("/")}>Back</button>
                </section>
            </div>
        </div>
    );
};

export default RunPrompt;
