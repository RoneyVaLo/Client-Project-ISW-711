import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { SHA256 } from 'crypto-js';
import { useState } from "react";


const UserForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const location = useLocation();

    const currentUser = location.state ? location.state.currentUser : false;

    let dataPrompt = (currentUser ? (currentUser.data) : {});


    const navigate = useNavigate();


    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        dataPrompt[name] = value;
    };



    const addUser = (body, config) => {
        axios.post('http://localhost:3001/api/users', body, config)
            .then((response) => {
                toast.success(`User ${response.statusText}`);
                navigate("/user");
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.statusText);
            });
    };

    const editUser = (body, config) => {
        axios.patch(`http://localhost:3001/api/users?id=${currentUser._id}`, body, config)
            .then(response => {
                console.log(response.statusText);
                toast.success("User Updated");
                navigate("/user");
            })
            .catch(err => {
                toast.error(err.response.statusText);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { first_name, last_name, email, roles, age, newPassword, verified } = e.target;
        // console.log(verified.checked)
        let hashedPassword = newPassword.value;

        if (newPassword.value !== "") {
            hashedPassword = SHA256(newPassword.value).toString();
        }

        const body = {
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            role: roles.value,
            age: age.value,
            password: hashedPassword,
            verified: verified.checked
        };

        const config = {
            headers: {
                authorization: `Bearer ${sessionStorage.token}`
            }
        };
        if (!currentUser) addUser(body, config);
        else editUser(body, config);
    };


    return (
        <div className="prompt-form">
            <h2>Users</h2>

            <form onSubmit={handleSubmit}>
                <h3>{`${currentUser ? "Update" : "Add New"} User`}</h3>


                <div className="row">
                    <div className="rows name">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" name="first_name"
                            defaultValue={currentUser ? currentUser.first_name : ""}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div className="rows name">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" name="last_name"
                            defaultValue={currentUser ? currentUser.last_name : ""}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="rows name">
                        <label htmlFor="username">Email</label>
                        <input type="email" name="email"
                            defaultValue={currentUser ? currentUser.email : ""}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div className="rows type">
                        <label htmlFor="roles">Role</label>
                        <select name="roles" id="roles"
                            defaultValue={currentUser ? (currentUser.role) : "user"}
                            disabled={(currentUser.role !== 'admin')}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                {/* TODO: Agregar el campo para el telefono y repetir contraseña, junto con las validaciones necesarias */}
                <div className="row">
                    <div className="rows name">
                        <label htmlFor="age">Age</label>
                        <input type="number" name="age"
                            defaultValue={currentUser ? currentUser.age : 0}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>
                    <div className="rows name">
                        <label htmlFor="newPassword">New Password</label>
                        <input type={showPassword ? "text" : "password"} name="newPassword" required={!currentUser} autoComplete="off" />
                        <div className="row" style={{ gap: "6px" }}>
                            <input type="checkbox" name="showPassword" id="showPassword"
                                style={{ minHeight: "0" }}
                                onChange={e => setShowPassword(e.target.checked)}
                            />
                            <label htmlFor="showPassword">Show Password</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="rows">
                        <input type="checkbox" name="verified"
                            defaultChecked={currentUser ? currentUser.verified : false}
                            disabled={(currentUser.role !== 'admin')}
                        />
                        <label htmlFor="verified">Is Verified</label>
                    </div>

                    <div className="rows">
                        <input type="checkbox" name="fa"
                        defaultChecked={currentUser ? currentUser.has2FA : false}
                        />
                        <label htmlFor="verified">2FA</label>
                    </div>
                </div>



                <div className="row buttons">
                    <button className="add-prompt">{`${currentUser ? "Update" : "Add"} user`}</button>
                    <button className="cancel" onClick={() => navigate('/user')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
