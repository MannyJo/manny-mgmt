import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const MyPage = props => {

    const { 
        userInfo,
        config
    } = props;
    const [ searchedUser, setSearchedUser ] = useState({});
    const [ role, setRole ] = useState({});

    useEffect(() => {
        axios.get(`/api/user/${userInfo.id}`, config)
        .then(results => {
            setSearchedUser(results.data);
            setRole(results.data.role);
        }).catch(err => {
            console.error('Error with getting user info :', err);
        });
    }, [ userInfo, config ]);

    return (
        <div>
            <h1>My Page</h1>
            <div>ID : {searchedUser.id}</div>
            <div>USERNAME : {searchedUser.username}</div>
            <div>Date of Creation : {searchedUser.createdDate}</div>
            <div>ROLE : {role.role}</div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    config: state.axiosConfig,
})

export default connect(mapStateToProps)(MyPage);