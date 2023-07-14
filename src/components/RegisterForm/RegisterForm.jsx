import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: Agregar el input y la variable para la foto de perfil
        const { first_name, last_name, age, username, password, repeatPassword } = e.target;
        console.log(password.value);
        console.log(repeatPassword.value);

        if (password.value === repeatPassword.value) {
            try {
                axios.post("http://localhost:3001/api/users",
                    {
                        first_name: first_name.value,
                        last_name: last_name.value,
                        age: age.value,
                        user_name: username.value,
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
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error("Passwords do not match");
        }
    };

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
                <label htmlFor="username">Username</label>
                <input type="text" name="username" required />
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
                <button>Cancel</button>
            </div>
        </form>
    );
}

export default RegisterForm;
