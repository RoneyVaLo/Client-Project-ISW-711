import { NavLink } from "react-router-dom"

const LoginForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" required/>
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" required/>
            </div>

            <div>
                <button>Login</button>
                <button>Cancel</button>
            </div>

            <p>If you do not have an account, <NavLink to="/signup">Signup here</NavLink></p>
        </form>
    )
}

export default LoginForm
