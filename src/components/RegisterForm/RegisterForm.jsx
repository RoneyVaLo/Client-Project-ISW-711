import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterForm = () => {

    const auth = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: Agregar el input y la variable para la foto de perfil
        const { first_name, last_name, age, email, password, repeatPassword } = e.target;

        if (password.value === repeatPassword.value) {
        // TODO: Cifrar la contraseña antes de enviarla al servidor, igual descifrar a la hora de hacer login
            axios.post("http://localhost:3001/api/users",
                {
                    first_name: first_name.value,
                    last_name: last_name.value,
                    age: age.value,
                    email: email.value,
                    password: password.value
                })
                .then((response) => {
                    console.log(response);
                    toast.success("Register successfull");
                    navigate('/');
                })
                .catch(err => {
                    console.log(err.message);
                    let errorMessage = err.response ? err.response.data.error : err.message
                    toast.error(errorMessage);
                });
        } else {
            toast.error("Passwords do not match");
        }
    };

    /* if (auth.currentUser !== "") {
        navigate("/");
        return window.location.reload();
    } */

    return (
        <form onSubmit={handleSubmit}>
            <h1>User Registration</h1>

            <div>
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" required />
            </div>

            <div>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" required />
            </div>

            <div>
                <label htmlFor="age">Age</label>
                <input type="number" name="age" required />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" required />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type={showPassword ? "text" : "password"} name="password" required autoComplete="off" />
                <div>
                    <input type="checkbox" name="showPassword"
                        onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    <label htmlFor="showPassword">Show Password</label>
                </div>
            </div>

            <div>
                <label htmlFor="repeatPassword">Password</label>
                <input type={showRepeatPassword ? "text" : "password"} name="repeatPassword" autoComplete="off" />
                <div>
                    <input type="checkbox" name="showRepeatPassword"
                        onChange={(e) => setShowRepeatPassword(e.target.checked)}
                    />
                    <label htmlFor="showRepeatPassword">Show Repeated Password</label>
                </div>
            </div>

            <div>
                <button>Register</button>
                <button onClick={() => navigate("/")}>Cancel</button>
            </div>
        </form>
    );
}

export default RegisterForm;
