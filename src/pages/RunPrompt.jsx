import { useLocation } from "react-router-dom";

import RunPromptComponent from "../components/RunPrompt/RunPrompt";

const RunPrompt = () => {

    const location = useLocation();

    const { name, type, data } = location.state.currentPrompt;

    return (
        <>
        <RunPromptComponent name={name} type={type} data={data} />
        </>
    );
};

export default RunPrompt;
