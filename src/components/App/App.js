import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Home from '../Home/Home';
import Nav from '../Nav/Nav';
import Storage from '../Storage/Storage';
import Food from '../Food/Food';
import MyPage from '../MyPage/MyPage';
import Login from '../Login/Login';
import Error from '../Error/Error';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Nav />
            <Switch>
                <Redirect exact from="/" to="/home" />
                <Route path="/home" component={Home} exact />
                <Route path="/login" component={Login} />
                <ProtectedRoute path="/storage" component={Storage} />
                <ProtectedRoute path="/food" component={Food} />
                <ProtectedRoute path="/mypage" component={MyPage} />
                <Route component={Error} />
            </Switch>
        </Router>
    );
}

export default App;