import React, { useState } from 'react';

const Login = () => {

    const DEFAULT_INFO = {
        username: '', password: ''
    };

    const [ user, setUser ] = useState(DEFAULT_INFO);
    const [ isChecked, setIsChecked ] = useState(false);

    const clickSubmit = e => {
        e.preventDefault();
        console.log(user);
    }

    const handleChangeFor = name => e => setUser({ ...user, [name]: e.target.value });

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={clickSubmit}>
                <label htmlFor="username">Username</label>
                <input name="username" type="text" onChange={handleChangeFor('username')} /><br/>
                <label htmlFor="password">Password</label>
                <input name="password" type={isChecked ? "text" : "password"} onChange={handleChangeFor('password')} /><br/>
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

export default Login;