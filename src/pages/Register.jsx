import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import RegisterForm from "../components/RegisterForm/RegisterForm";
import { useState } from "react";

const Register = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const saveUser = (userData) => {
        setIsLoading(true);
        const { first_name, last_name, age, email, password } = userData;

        axios.post("http://localhost:3001/api/user/register",
            {
                first_name,
                last_name,
                age,
                email,
                password
            })
            .then(async (response) => {
                const dataEmail = {
                    destinationEmail: email,
                    redirectLink: `http://localhost:5173/verification/${response.data._id}`
                };

                axios.post("http://localhost:3001/api/users/verification-email", dataEmail)
                    .then(res => {
                        console.log(res.statusText);
                        toast.success("Verification email sent successfully");
                    })
                    .catch(err => {
                        console.log(err.response.data.message);
                        toast.error("Verification email not sent!!");
                    })
                    .finally(() => {
                        setIsLoading(false);
                        toast.success("Register successfull");
                        navigate('/');
                    });

            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                let errorMessage = err.response ? err.response.data.error : err.message
                toast.error(errorMessage);
            });
    };

    return (
        <RegisterForm saveUser={saveUser} isLoading={isLoading} />
    );
}

export default Register;
