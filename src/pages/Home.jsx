import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from "../components/Navigation/Navigation";

const Home = () => {
    return (
        <>
        <Navigation />
        <Header />
        <Outlet />
        </>
    );
}

export default Home;
