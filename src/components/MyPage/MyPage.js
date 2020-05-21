import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MyPageForm from './MyPageForm';

const MyPage = props => {

    const { 
        userInfo,
        config
    } = props;
    const [ searchedUser, setSearchedUser ] = useState({});
    const [ role, setRole ] = useState({});
    const [ hidden, setHidden ] = useState(true);
    let history = useHistory();

    useEffect(() => {
        if(userInfo.id > 0) {
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
        }
    }, [ userInfo, config ]);

    const deleteUser = () => {
        axios.delete(`/api/user/delete/${userInfo.id}`, config)
        .then(results => {
            console.log(results.data);
            logout();
            history.push('/home');
        }).catch(err => {
            console.error('Error with deleting user :', err.response.data.message);
        });
    }

    const logout = () => {
        props.dispatch({ type: 'UNSET_USERINFO' });
        props.dispatch({ type: 'LOGOUT' });
    }

    return (
        <div className="myPageContainer">
            <div className="titleContainer">
                <h1 className="pageTitle">My Page</h1>
            </div>
            <div className="myPageContentContainer">
                <div className="myPageTitle"><strong>Username</strong></div>
                <div className="myPageContent">{searchedUser.username}</div>
                <div className="myPageTitle"><strong>Role</strong></div>
                <div className="myPageContent">{role.role}</div>
            </div>
            <div className="myPageBtnContainer">
                <button className="btnDelete" onClick={deleteUser}>Delete Account</button>
                <button className="btnUpdate" onClick={() => setHidden(!hidden)}>Change Password</button>
            </div>
            <MyPageForm
                hidden={hidden}
                setHidden={setHidden}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    config: state.axiosConfig,
})

export default connect(mapStateToProps)(MyPage);