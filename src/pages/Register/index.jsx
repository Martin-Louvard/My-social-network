import React from 'react';
import Cookies from 'js-cookie'


const Register = () => {
    const [usernameValue, setUsernameValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");
    const [emailValue, setEmailValue] = React.useState("");

    const handleChangeUsername = (event) => {
        setUsernameValue(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmailValue(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPasswordValue(event.target.value);
    };

  const handleSubmit = (event)=>{
    event.preventDefault();

    const data = {
        username: usernameValue,
        email: emailValue,
        password: passwordValue
      };
      
      fetch('http://localhost:1337/auth/local/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((response)=>response.json())
      .then((response)=> Cookies.set('jwt', response.jwt))      
  };


    return (
        <div className="Register">
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username :
          <input type="text" value={usernameValue} onChange={handleChangeUsername} />
                </label>
                <label>
                    Email :
          <input type="text" value={emailValue} onChange={handleChangeEmail} />
                </label>
                <label>
                    Password :
          <input type="text" value={passwordValue} onChange={handleChangePassword} />
                </label>
                <input type="submit" value="Envoyer" />
            </form>

        </div>
    );
}

export default Register