import { useLocation } from "react-router-dom";

import RunPromptComponent from "../components/RunPrompt/RunPrompt";

const RunPrompt = () => {

    const location = useLocation();

    const { type, data } = location.state.currentPrompt;

    return (
        <>
        <RunPromptComponent type={type} data={data} />
        </>
    );
};

export default RunPrompt;
