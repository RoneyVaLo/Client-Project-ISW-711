import { NavLink } from "react-router-dom";

const Navigation = () => {

    // TODO: Agregar los demás links a las demás secciones una vez logueado
    // TODO: Hacer que los links sean iconos

    return (
        <nav>
            <ul>
                <NavLink to="/">Home</NavLink>
            </ul>
        </nav>
    );
}

export default Navigation;
