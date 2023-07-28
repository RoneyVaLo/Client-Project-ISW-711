import { useLocation } from "react-router-dom";

import RunPromptComponent from "../components/RunPrompt/RunPrompt";

const RunPrompt = () => {

    const location = useLocation();

    const { currentPrompt } = location.state;

    return (
        <>
        <RunPromptComponent currentPrompt={currentPrompt} />
        </>
    );
};

export default RunPrompt;
