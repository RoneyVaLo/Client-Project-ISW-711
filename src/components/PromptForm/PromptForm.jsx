import { useNavigate } from "react-router-dom";
import './promptForm.scss';

const PromptForm = () => {

    const navigate = useNavigate();

    return (
        <div className="prompt-form">
            <h2>Prompts</h2>

            <form onClick={(e) => e.preventDefault()}>
                <h3>Add new Prompt</h3>

                <div className="row">
                    <div className="rows name">
                        <label htmlFor="promptName">Name</label>
                        <input type="text" name="promptName" />
                    </div>

                    <div className="rows type">
                        <label htmlFor="types">Type</label>
                        <select name="types" id="types">
                            <option value="">Select</option>
                            <option value="edit">Edit</option>
                            <option value="images">Images</option>
                            <option value="completion">Completion</option>
                        </select>
                    </div>
                    {/* 
                    TODO: Hacer que según el tipo que se elije así sean los campos que se soliciten
                        Puede ser mediante funciones que retorne el html con los espacios necesarios
                     */}

                </div>

                <div className="rows">
                    <label htmlFor="input">Input</label>
                    <textarea name="input" id="input" placeholder="Type here"></textarea>
                </div>

                <div className="rows">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea name="instructions" id="instructions" placeholder="Type here"></textarea>
                </div>

                <div className="rows">
                    <label htmlFor="temperature">Temperature</label>
                    <input type="number" name="temperature" id="temperature" min={1} defaultValue={1} />
                </div>

                <div className="rows">
                    {/*TODO: Ver como gestiono lo de las etiquetas */}
                    <label htmlFor="">Labels</label>
                    <div className="rows-labels">Aquí se mostrarán las etiquetas</div>
                </div>

                <div className="row buttons">
                    <button className="add-prompt">Add prompt</button>
                    <button className="cancel" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default PromptForm
