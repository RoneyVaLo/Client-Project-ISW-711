import { useState } from "react";

const Auth2FA = ({ code2FA, validate2FA }) => {

    const [twoFactorCode, setTwoFactorCode] = useState('');

    const handle2FACheck = () => {
        validate2FA(twoFactorCode === code2FA);
    };


    return (
        <div>
            <h2>Autenticación de dos factores</h2>
            <input
                type="text"
                placeholder="Código de 2FA"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
            />
            <button onClick={handle2FACheck}>Verificar 2FA</button>
        </div>
    );
};

export default Auth2FA;
