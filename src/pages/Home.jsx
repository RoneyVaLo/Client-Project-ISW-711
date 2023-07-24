import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Navigation from "../components/Navigation/Navigation";

const Home = () => {
    return (
        <>
            <Navigation />
            <main>
                <Header />
                <Outlet />
            </main>
        </>
    );
}

export default Home;
