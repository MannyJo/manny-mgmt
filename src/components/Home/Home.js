import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const Home = props => {
    const {
        userInfo,
        auth,
    } = props;

    useEffect(() => {
        document.title = 'Home';
    });

    const getUserName = username => username.split('@')[0];

    return (
        <div className="background">
            <div className="title">What's In My Storage</div>
            <div hidden={auth ? false : true}>
                <div className="homeWelcome">Welcome,</div>
                <div className="homeName">{getUserName(userInfo.username)}</div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    auth: state.axiosConfig.headers.Authorization,
})

export default connect(mapStateToProps)(Home);