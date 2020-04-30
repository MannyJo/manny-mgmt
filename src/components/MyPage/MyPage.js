import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPage = () => {

    const id = 1;
    const [ userInfo, setUserInfo ] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/${id}`)
        .then(results => {
            console.log(results.data);
            setUserInfo(results.data);
        }).catch(err => {
            console.log('Error with getting user info :', err);
        });
    }, [ id ]);

    return (
        <div>
            <h1>My Page</h1>
            <div>{userInfo.id}</div>
            <div>{userInfo.name}</div>
            <div>{userInfo.email}</div>
            <div>{userInfo.createdDate}</div>
        </div>
    );
}

export default MyPage;