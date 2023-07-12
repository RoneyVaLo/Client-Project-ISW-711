import './header.scss';
import { useAuth } from '../../context/AuthContext';

import profileIcon from '../../assets/profile.svg';

const Header = () => {
    const auth = useAuth();
    const { currentUser } = auth;
    console.log(currentUser);

    // TODO: Agregar la validación para que aparezcan los datos del usuario cuando se loguee
    return (
        <header>
            <div className='logo'>
                @ Your Company
            </div>
            {(currentUser !== "") &&
                <div className='user'>
                    <div className="user__name">
                        <h2>{`${currentUser.first_name} ${currentUser.last_name}`}</h2>
                    </div>
                    <div className="user__photo">
                        <img src={profileIcon} alt="profile picture" />
                    </div>
                </div>
            }
        </header>
    );
}

export default Header;
