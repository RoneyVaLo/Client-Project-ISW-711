import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.error(error);


    return (
        <div id="error-page" style={{ "display": "grid", "place-items": "center", "width": "100%" }}>
            <div style={{ "color": "#fff", "width": "50%", "textAlign": "center" }}>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    );
};

export default Error;
