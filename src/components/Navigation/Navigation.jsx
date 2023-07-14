import { useNavigate } from "react-router-dom";

import './navigation.scss';
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Navigation = () => {

    const navigate = useNavigate();

    const auth = useAuth();
    // console.log(auth.currentUser === "");

    useEffect(() => {
        document.getElementById('home').checked = true;
    }, [])


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

                {auth.currentUser !== "" &&
                    <>
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
                    </>
                }
            </div>
        </nav>
    );
}

export default Navigation;
