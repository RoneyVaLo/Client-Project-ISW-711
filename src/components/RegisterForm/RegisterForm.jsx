import { useState } from "react";
// import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { SHA256 } from "crypto-js";

const RegisterForm = ({ saveUser, isLoading }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: Agregar el input y la variable para la foto de perfil
        const { first_name, last_name, age, email, password, repeatPassword } = e.target;

        if (password.value === repeatPassword.value) {
            const hashedPassword = SHA256(password.value).toString();
            const userData =
            {
                first_name: first_name.value,
                last_name: last_name.value,
                age: age.value,
                email: email.value,
                password: hashedPassword
            };

            saveUser(userData);
        } else {
            toast.error("Passwords do not match");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="registration-form">
            <h1 className="registration-heading">User Registration</h1>

            <div className="form-group">
                <label htmlFor="first_name" className="label">First Name</label>
                <input type="text" name="first_name" required className="input" />
            </div>

            <div className="form-group">
                <label htmlFor="last_name" className="label">Last Name</label>
                <input type="text" name="last_name" required className="input" />
            </div>

            <div className="form-group">
                <label htmlFor="age" className="label">Age</label>
                <input type="number" name="age" required className="input" />
            </div>

            <div className="form-group">
                <label htmlFor="email" className="label">Email</label>
                <input type="email" name="email" required className="input" />
            </div>

            <div className="form-group">
                <label htmlFor="password" className="label">Password</label>
                <input type={showPassword ? "text" : "password"} name="password" required
                    autoComplete="off"
                    className="input"
                    minLength={8}
                />
                <div className="show-password">
                    <input type="checkbox" name="showPassword" onChange={(e) => setShowPassword(e.target.checked)} />
                    <label htmlFor="showPassword" className="label">Show Password</label>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="repeatPassword" className="label">Repeat Password</label>
                <input
                    type={showRepeatPassword ? "text" : "password"}
                    name="repeatPassword"
                    autoComplete="off"
                    className="input"
                    minLength={8}
                />
                <div className="show-password">
                    <input
                        type="checkbox"
                        name="showRepeatPassword"
                        onChange={(e) => setShowRepeatPassword(e.target.checked)}
                    />
                    <label htmlFor="showRepeatPassword" className="label">Show Repeated Password</label>
                </div>
            </div>

            <div className="button-group">
                <button className="register-button" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                <button className="cancel-button" onClick={() => navigate("/")}>Cancel</button>
            </div>
        </form>

    );
}

export default RegisterForm;
