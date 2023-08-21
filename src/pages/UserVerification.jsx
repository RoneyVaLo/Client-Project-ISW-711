import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-hot-toast";

import '../Sass/userVerification.scss';

const UserVerification = () => {

    const [haveError, setHaveError] = useState(false);
    const { id } = useParams();

    const verifyUser = () => {
        try {
            const body = {
                verified: true
            };
            const config = {
                headers: {
                    authorization: `Bearer ${sessionStorage.token}`
                }
            };

            axios.patch(`http://localhost:3001/api/users/verification-email?id=${id}`, body, config)
                .then(response => {
                    console.log(response.data.message);
                    setHaveError(false);
                    toast.success(response.data.message);
                    setTimeout(() => {
                        window.location.href = 'http://localhost:5173';
                    }, 2000);
                })
                .catch(err => {
                    console.log(err.response.data.error);
                    setHaveError(true);
                    toast.error(err.response.data.error);
                });
        } catch (err) {
            console.log(err);
            setHaveError(true);
        }
    };

    useEffect(() => {
        verifyUser();
    }, []);

    if (haveError) {
        return (
            <div></div>
        );
    }

    return (
        <div className="verification-container">
            <div className='verification-container__main'>
                <h2>Account Verification</h2>
                <p className='verification-container__main-subtitle'>
                    Your account has been successfully verified!
                </p>
                <p style={{ margin: '2em 0' }}>
                    Now you can access all the services and features of our platform.
                </p>
                <a href="http://localhost:5173/" className='verification-container__main-link'>Go to Login</a>
                <p style={{ marginTop: '2em' }}>If your browser does not automatically redirect you in a few seconds, click the button above.</p>
            </div>
        </div>
    );
};

export default UserVerification;
