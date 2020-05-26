import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = props => {

    const DEFAULT_INFO = {
        username: '', 
        password: ''
    };
    const {
        config
    } = props;
    const [ isLogin, setIsLogin ] = useState(true);
    const [ user, setUser ] = useState(DEFAULT_INFO);
    const [ isChecked, setIsChecked ] = useState(false);
    let history = useHistory();

    useEffect(() => {
        console.log('config :', config);
        if(props.config.headers.Authorization) {
            history.push('/home');
        }
    });

    const clickSubmit = e => {
        e.preventDefault();
        
        if(isLogin) {
            submitLogin();
        } else {
            submitRegister();
        }
    }

    const submitRegister = () => {
        axios.post('/api/user/create', user, config)
        .then(results => {
            console.log(results);
            setIsLogin(true);
        }).catch(err => {
            console.error('Error with logging in :', err);
        });
    }

    const submitLogin = () => {
        // CORS problem is solved by using JSON.stringify
        axios.post('/login', JSON.stringify(user), config)
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

    const loginRegisterChangeClick = () => setIsLogin(!isLogin);

    return (
        <div className="background">
            <div className="loginContainer">
                <div className="titleContainer">
                    <h1>{ isLogin ? 'Login' : 'Register' }</h1>
                </div>
                <div className="loginFormContainer">
                    <form onSubmit={clickSubmit}>
                        <label htmlFor="username">Username</label>
                        <input 
                            name="username" 
                            type="text" 
                            onChange={handleChangeFor('username')} 
                            value={user.username}
                            className="loginInput"
                            placeholder="email@address.com"
                        /><br/>
                        <label htmlFor="password">Password</label>
                        <input 
                            name="password" 
                            type={isChecked ? "text" : "password"} 
                            onChange={handleChangeFor('password')} 
                            value={user.password}
                            className="loginInput"
                        /><br/>
                        <label htmlFor="checkbox">
                            <input type="checkbox" name="checkbox" value={isChecked} onChange={e => setIsChecked(e.target.checked)} />
                            <span> Show Password</span>
                        </label>
                        <br/>
                        <div className="loginBtnContainer">
                            <button className="loginBtn" type="submit">{ isLogin ? 'Login' : 'Register' }</button>
                        </div>
                    </form>
                </div>
                <div className="loginRegisterChange">
                    <span>{ isLogin ? 'Not a member? ' : 'Already registered? ' }
                        <button onClick={loginRegisterChangeClick}>
                            { isLogin ? 'Register' : 'Login' }
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    config: state.axiosConfig,
});

export default connect(mapStateToProps)(Login);