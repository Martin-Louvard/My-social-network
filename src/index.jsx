import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import {PrivateRoute} from './components/PrivateRoute';
import User from './pages/Users';
import './main.css'

const App = () => {
    return (
            <Router>
                <Navbar />
                <main>
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <PrivateRoute path="/users/me" component={Profile} />
                        <PrivateRoute path="/users/:userId" component={User} />
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </main>
            </Router>
    );
}

ReactDOM.render(<App />, document.querySelector("#root"));