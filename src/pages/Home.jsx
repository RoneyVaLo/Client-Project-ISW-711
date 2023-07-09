import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const Home = () => {
    return (
        <>
        <Header />
        <Navigation />
        <Outlet />
        </>
    );
}

export default Home;
