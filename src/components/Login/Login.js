import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = props => {

    const DEFAULT_INFO = {
        username: 'jomansang@gmail.com', 
        password: 'password123'
    };

    const [ user, setUser ] = useState(DEFAULT_INFO);
    const [ isChecked, setIsChecked ] = useState(false);

    let history = useHistory();

    useEffect(() => {
        if(props.config.headers.Authorization) {
            history.push('/home');
        }
    });

    const clickSubmit = e => {
        e.preventDefault();
        
        // CORS problem is solved by using JSON.stringify
        axios.post('/login', JSON.stringify(user))
        .then(results => {
            const userInfo = {
                id: results.data.id,
                username: user.username,
                roleId: results.data.roleId
            }

            props.dispatch({ type: 'LOGIN', payload: results.headers.authorization });
            props.dispatch({ type: 'SET_USERINFO', payload: userInfo })
            history.push('/home');
        }).catch(err => {
            console.error('Error with logging in :', err);
        });
    }

    const handleChangeFor = name => e => setUser({ ...user, [name]: e.target.value });

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={clickSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    name="username" 
                    type="text" 
                    onChange={handleChangeFor('username')} 
                    value={user.username}
                /><br/>
                <label htmlFor="password">Password</label>
                <input 
                    name="password" 
                    type={isChecked ? "text" : "password"} 
                    onChange={handleChangeFor('password')} 
                    value={user.password}
                /><br/>
                <label htmlFor="checkbox">
                    <input type="checkbox" name="checkbox" value={isChecked} onChange={e => setIsChecked(e.target.checked)} />
                    <span> Show Password</span>
                </label>
                <br/>
                <input type="submit" value="OK" />
            </form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    config: state.axiosConfig,
});

export default connect(mapStateToProps)(Login);