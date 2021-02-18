import React from 'react';
import Cookies from 'js-cookie';


const Login = () => {
    const [emailValue, setEmailValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");

    const handleChangeEmail = (event) => {
        setEmailValue(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPasswordValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            identifier: emailValue,
            password: passwordValue
        };

        fetch('http://localhost:1337/auth/local', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        })
            .then((response) => response.json())
            .then((response) => Cookies.set('jwt', response.jwt))

          
    };

    return (
        <div className="Login">
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email :
          <input type="text" value={emailValue} onChange={handleChangeEmail} />
                </label>
                <label>
                    Password :
          <input type="text" value={passwordValue} onChange={handleChangePassword} />
                </label>
                <input type="submit" value="Se connecter" />
            </form>
        </div>

    );
}

export default Login