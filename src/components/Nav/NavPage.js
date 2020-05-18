import React from 'react';
import { connect } from 'react-redux';
import {
    Link
} from 'react-router-dom';

const NavPage = props => {
    let {
        userInfo,
        auth,
        hidden,
        setHidden
    } = props;

    const logout = () => {
        props.dispatch({ type: 'UNSET_USERINFO' });
        props.dispatch({ type: 'LOGOUT' });
    }

    const closeNav = stat => () => {
        if(stat === 'login' && auth) {
            logout();
        }
        setHidden(!hidden);
    };

    return (
        <div className={"navPage " + (hidden ? "hidden" : "")}>
            <div className="navContent">
                <div className="navTitle">
                {
                    auth ? userInfo.username.split('@')[0] : "Please Login"
                }
                </div>
                <div>
                    <Link to="/" onClick={closeNav('')}>Home</Link>
                </div>
                {
                    auth !== '' ?
                    <>
                        <div>
                            <Link to="/storage" onClick={closeNav('')}>Storage</Link>
                        </div>
                        <div>
                            <Link to="/mypage" onClick={closeNav('')}>My Page</Link>
                        </div>
                    </>
                    : null
                }
                <div className="navLogin">
                    <Link to={auth ? '/home' : '/login'} onClick={closeNav('login')}>
                        {auth ? 'Logout' : 'Login'}
                    </Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.axiosConfig.headers.Authorization,
    userInfo: state.userInfo,
})

export default connect(mapStateToProps)(NavPage);