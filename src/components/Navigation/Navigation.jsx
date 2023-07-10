import { useNavigate } from "react-router-dom";

import './navigation.scss';
import { useEffect } from "react";

const Navigation = () => {

    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById('home').checked = true;
    }, [])


    // TODO: Hacer que solo aparezca el home cuando no se esté logueado
    // TODO: Cambiar las rutas a las demás secciones una vez logueado

    return (
        <nav>
            <div className="icon-menu"><ion-icon name="menu-outline"></ion-icon></div>
            <div className="menu">
                <div className="menu__link">
                    <input type="radio" name="links" id="home"
                        onChange={(e) => ((e.target.checked) && navigate("/"))}
                    />
                    <label htmlFor="home">
                        <ion-icon name="home-sharp"></ion-icon>
                    </label>
                </div>

                <div className="menu__link">
                    <input type="radio" name="links" id="prompts"
                        onChange={(e) => ((e.target.checked) && navigate("/"))}
                    />
                    <label htmlFor="prompts">
                        <ion-icon name="images-sharp"></ion-icon>
                    </label>
                </div>

                <div className="menu__link">
                    <input type="radio" name="links" id="users"
                        onChange={(e) => ((e.target.checked) && navigate("/"))}
                    />
                    <label htmlFor="users">
                        <ion-icon name="people-sharp"></ion-icon>
                    </label>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
