import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Login from '../Login/Login';

const ProtectedRoute = props => {

    const {
        component: ComponentToProtect,
        auth,
        ...otherProps
    } = props;

    return (
        <Route
            { ...otherProps }
            render={() => (
                auth ? <ComponentToProtect /> : <Login />
            )}
        />
    );
}

const mapStateToProps = state => ({
    auth: state.axiosConfig.headers.Authorization
});

export default connect(mapStateToProps)(ProtectedRoute);