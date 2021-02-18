import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import { checkAuth } from '../../components/PrivateRoute';




const Navbar = () => {
    const history = useHistory();

    const logout = ()=>{
        Cookies.remove('jwt');
        history.push("/login");
    };

    return(
    <nav>
        <Link to="/Home" className="nav-element">HOME</Link>
        <Link to="/users/me" className="nav-element">MY PROFILE</Link>
        {checkAuth()? <button onClick={logout} className="nav-element">LOG OUT</button>
        :
        <span>
        <Link to='/Login' className="nav-element">LOGIN</Link>
        <Link to='/Register' className="nav-element">REGISTER</Link>
        </span>
        }
        
        
    </nav>
    )
};
export default Navbar;