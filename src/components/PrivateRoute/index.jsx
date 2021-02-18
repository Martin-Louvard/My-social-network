import {
    Route,
    Redirect,
} from "react-router-dom";
import Cookies from 'js-cookie';




const checkAuth = () => {
    return Cookies.get('jwt')
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuth() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/login' }} />
            )
    )} />
);

export {checkAuth, PrivateRoute};
