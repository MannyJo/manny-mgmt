import React from 'react';
import {
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = props => {
    let auth = props.auth;

    const logout = () => {
        props.dispatch({ type: 'UNSET_USERINFO' });
        props.dispatch({ type: 'LOGOUT' });
    }

    return (
        <nav className="navigation">
            <Link to="/">Home</Link>
            {
                auth !== '' ?
                <>
                    <Link to="/storage">Storage</Link>
                    <Link to="/mypage">My Page</Link>
                </>
                : null
            }
            <Link to={auth ? '/home' : '/login'} onClick={auth ? logout : null}>
                {auth ? 'LOGOUT' : 'LOGIN'}
            </Link>
        </nav>
    );
}

const mapStateToProps = (state) => ({
    auth: state.axiosConfig.headers.Authorization,
})

export default connect(mapStateToProps)(Nav);