import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { SHA256 } from "crypto-js";
import { useAuth } from "../../context/AuthContext";
import './loginForm.scss';
import Auth2FA from "../../pages/Auth2FA";
import { useEffect } from "react";

const LoginForm = () => {

    const auth = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [need2FA, setNeed2FA] = useState(false);

    const [code2FA, setCode2FA] = useState(false);
    const [isCorrect2FA, setIsCorrect2FA] = useState(false);

    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false);


    useEffect(() => {
        const login = async () => {
            sessionStorage.setItem("token", token);
            await auth.login(userId);
            toast.success("Login successfull");
        };
        if (isCorrect2FA) {
            login();
        }
    }, [isCorrect2FA])

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

                // Get user data for use across all apps
                const body = {
                    email: email.value
                };
                const config = {
                    headers: {
                        authorization: `Bearer ${response.data?.token}`
                    }
                };

                const { data } = await axios.post(`http://localhost:3001/api/users`, body, config);
                const { _id: userId, has2FA, phone } = data;

                if (has2FA) {
                    const res = await axios.post("http://localhost:3001/api/users/send-code2FA", { destination: phone });
                    const { message, code } = res.data;
                    setNeed2FA(true);
                    toast.success(message);

                    setCode2FA(code);
                    setToken(response.data?.token);
                    setUserId(userId);
                } else {
                    sessionStorage.setItem("token", response.data?.token);
                    setNeed2FA(false);
                    await auth.login(userId);
                    toast.success("Login successfull");
                }
            })
            .catch(err => {
                console.log(err.message);
                let errorMessage = err.response ? err.response.data.error : err.message
                toast.error(errorMessage);
            })
    };

    const validate2FA = (isValidate) => {
        setIsCorrect2FA(isValidate);
    };

    if (need2FA) {
        return (
            <Auth2FA code2FA={code2FA} validate2FA={validate2FA} />
        );
    }


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
