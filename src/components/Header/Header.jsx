import './header.scss';
import { useAuth } from '../../context/AuthContext';

import profileIcon from '../../assets/profile.svg';

const Header = () => {
    const auth = useAuth();
    const { currentUser } = auth;
    // console.log(currentUser);


    return (
        <header className="header">
            <h1 className="header__title">Empresa XYZ</h1>
            {currentUser &&
                <div className="header__user">
                    <ion-icon className="header__notification-icon" name="notifications-sharp"></ion-icon>
                    <div className="header__user-info">
                        <div className='header__user-details'>
                            <p className="header__user-details-name">
                                {(`${currentUser.first_name} ${currentUser.last_name}`)}
                            </p>
                            <p className='header__user-details-role'>{`${currentUser.role}`}</p>
                        </div>

                        { /*TODO: Cambiar la gestión de la imagen de la foto de perfil, ya que no es un link */}
                        <img
                            className="header__user-avatar"
                            src={(currentUser.profile_image !== "") ? "https://w.forfun.com/fetch/f6/f6b5d2a50a42e6d0ee10c119c55b002a.jpeg" : profileIcon}
                            alt="User image"
                        />
                    </div>
                </div>
            }
        </header>
    );
};

export default Header;
