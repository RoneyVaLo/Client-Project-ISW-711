import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from "../../context/AuthContext";
import './loginForm.scss';

// TODO: Falta agregar estilos
const LoginForm = () => {

    const auth = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target;

        axios.post("http://localhost:3001/api/login",
            {
                email: email.value,
                password: password.value
            })
            .then(async (response) => {
                // console.log(response.data?.session);
                sessionStorage.setItem("token", response.data.session.token);

                // Get user data for use across all apps
                await auth.login(response.data.session.user);

                toast.success("Login successfull");
            })
            .catch(err => {
                console.log(err.message);
                let errorMessage = err.response ? err.response.data.error : err.message
                toast.error(errorMessage);
            })
    };


    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h1 className="login-heading">Login</h1>

            <div className="form-group">
                <label htmlFor="email" className="label">Email</label>
                <input type="email" name="email" required className="input" />
            </div>

            <div className="form-group">
                <label htmlFor="password" className="label">Password</label>
                <input type={showPassword ? "text" : "password"} name="password" required autoComplete="off" className="input" />
                <div className="show-password">
                    <input type="checkbox" name="showPassword" onChange={(e) => setShowPassword(e.target.checked)} />
                    <label htmlFor="showPassword" className="label">Show Password</label>
                </div>
            </div>

            <div className="button-group">
                <button className="login-button">Login</button>
                <button className="cancel-button">Cancel</button>
            </div>

            <p className="signup-p">If you do not have an account, <NavLink to="/signup" className="signup-a">Signup here</NavLink></p>
        </form>
    );
};

export default LoginForm;
