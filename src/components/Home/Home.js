import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const Home = props => {
    const userInfo = props.userInfo;

    useEffect(() => {
        document.title = 'Home';
        console.log(userInfo);
    });

    return (
        <div>
            <h1>HOME</h1>
            <h2 hidden={userInfo.id ? false : true}>Hello, {userInfo.username}.</h2>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo
})

export default connect(mapStateToProps)(Home);