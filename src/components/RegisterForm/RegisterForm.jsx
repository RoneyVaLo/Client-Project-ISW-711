import { useState } from "react";

const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>User Registration</h1>

            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" required />
            </div>

            <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" required />
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
