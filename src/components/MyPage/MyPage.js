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
            setSearchedUser({ 
                ...results.data, 
                createdDate: results.data.createdDate.substr(0, 10) 
            });
            setRole(results.data.role);
        }).catch(err => {
            console.error('Error with getting user info :', err);
        });
    }, [ userInfo, config ]);

    return (
        <div className="myPageContainer">
            <div className="titleContainer">
                <h1 className="pageTitle">My Page</h1>
            </div>
            <div className="myPageContentContainer">
                <div className="myPageTitle"><strong>Username</strong></div>
                <div className="myPageContent">{searchedUser.username}</div>
                <div className="myPageTitle"><strong>Date of Creation</strong></div>
                <div className="myPageContent">{searchedUser.createdDate}</div>
                <div className="myPageTitle"><strong>Role</strong></div>
                <div className="myPageContent">{role.role}</div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    config: state.axiosConfig,
})

export default connect(mapStateToProps)(MyPage);