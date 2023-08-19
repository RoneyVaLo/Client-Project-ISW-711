import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import './navigation.scss';

const Navigation = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [selectedButton, setSelectedButton] = useState('');

    const auth = useAuth();


    useEffect(() => {
        const currentPath = location.pathname;

        setSelectedButton(currentPath);
    }, [location]);


    return (
        <nav>
            <div className="icon-menu"><ion-icon name="menu-outline"></ion-icon></div>
            <div className="menu">
                <div className="menu__link">
                    <input type="radio" name="links" id="home"
                        value="/"
                        onChange={(e) => ((e.target.checked) && navigate("/"))}
                        checked={(selectedButton === '/' || selectedButton === '/signup')}
                        disabled={auth.currentUser !== ""}
                    />
                    <label htmlFor="home">
                        <ion-icon name="home-sharp"></ion-icon>
                    </label>
                </div>

                {auth.currentUser !== "" &&
                    <>
                        <div className="menu__link">
                            <input type="radio" name="links" id="search"
                                value="/search"
                                onChange={(e) => ((e.target.checked) && navigate("/search"))}
                                checked={(selectedButton === '/search')}
                            />
                            <label htmlFor="search">
                                <ion-icon name="search-sharp"></ion-icon>
                            </label>
                        </div>

                        <div className="menu__link">
                            <input type="radio" name="links" id="prompts"
                                value="/"
                                onChange={(e) => ((e.target.checked) && navigate("/"))}
                                checked={(selectedButton === '/' || selectedButton.startsWith('/prompt'))}
                            />
                            <label htmlFor="prompts">
                                <ion-icon name="images-sharp"></ion-icon>
                            </label>
                        </div>

                        <div className="menu__link">
                            <input type="radio" name="links" id="users"
                                value="/user"
                                onChange={(e) => ((e.target.checked) && navigate("/user"))}
                                checked={selectedButton.startsWith('/user')}
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
