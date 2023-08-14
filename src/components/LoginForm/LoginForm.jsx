import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { SHA256 } from "crypto-js";
import { useAuth } from "../../context/AuthContext";
import './loginForm.scss';

const LoginForm = () => {

    const auth = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target;

        const hashedPassword = SHA256(password.value).toString();
        // console.log(hashedPassword);

        axios.post("http://localhost:3001/api/login",
            {
                email: email.value,
                password: hashedPassword
            })
            .then(async (response) => {
                // console.log(response.data?.token);
                sessionStorage.setItem("token", response.data?.token);

                // Get user data for use across all apps
                const body = {
                    email: email.value
                };
                const config = {
                    headers: {
                        authorization: `Bearer ${sessionStorage.token}`
                    }
                };

                const { data } = await axios.post(`http://localhost:3001/api/users`, body, config);
                const { _id: userId } = data;
                await auth.login(userId);

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
                <input type={showPassword ? "text" : "password"} name="password" required
                    autoComplete="off"
                    className="input"
                    /* minLength={8} */ />
                <div className="show-password">
                    <input type="checkbox" name="showPassword" onChange={(e) => setShowPassword(e.target.checked)} />
                    <label htmlFor="showPassword" className="label">Show Password</label>
                </div>
            </div>

            <div className="button-group">
                <button className="login-button">Login</button>
                
            </div>

            <p className="signup-p">If you do not have an account, <NavLink to="/signup" className="signup-a">Signup here</NavLink></p>
        </form>
    );
};

export default LoginForm;
