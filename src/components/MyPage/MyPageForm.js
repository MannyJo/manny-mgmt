import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const MyPageForm = props => {

    const {
        config,
        userInfo,
        hidden,
        setHidden
    } = props;
    const DEFAULT_USER = {
        id: userInfo.id,
        password: '',
        newPassword: ''
    };
    const [ updateUser, setUpdateUser ] = useState(DEFAULT_USER);
    const [ isChecked, setIsChecked ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ isUpdateSuccess, setUpdateSuccess ] = useState(false);

    const closeModal = e => {
        if(e.target.className === 'modal' || e.target.className === 'modalClose') {
            setHidden(true);
        }
    };

    const handleChangeFor = name => e => {
        setUpdateUser({
            ...updateUser,
            [name]: e.target.value
        });
    }

    const clickSubmit = e => {
        e.preventDefault();

        if(updateUser.password && updateUser.newPassword) {
            axios.put(`/api/user/update/password`, updateUser, config)
            .then(results => {
                setUpdateSuccess(true);
                setMessage(results.data.message);
                setTimeout(() => setHidden(true), 2000);
            })
            .catch(err => {
                console.error('Error with changing password :', err.response.data.message);
                setUpdateSuccess(false);
                setMessage(err.response.data.message);
            });
        } else {
            setMessage('Password must be filled');
        }
    }

    return (
        <div className="modal" hidden={hidden} onClick={closeModal}>
            <div className="modalContent">
                <div className="modalTitleContainer">
                    <span className="modalClose" onClick={closeModal}>&times;</span>
                    <div>Edit User</div>
                </div>
                <form className="modalContentContainer" onSubmit={clickSubmit}>
                    <label className="modalLabel" htmlFor="username">Password</label>
                    <input
                        type={ isChecked ? "text" : "password"}
                        name="password"
                        className="modalInput"
                        value={updateUser.password}
                        placeholder="password"
                        onChange={handleChangeFor('password')}
                    />
                    <label className="modalLabel" htmlFor="username">New Password</label>
                    <input
                        type={ isChecked ? "text" : "password"}
                        name="newPassword"
                        className="modalInput"
                        value={updateUser.newPassword}
                        placeholder="New Password"
                        onChange={handleChangeFor('newPassword')}
                    />
                    <label htmlFor="checkbox">
                        <input type="checkbox" name="checkbox" value={isChecked} onChange={e => setIsChecked(e.target.checked)} />
                        <span> Show Password</span>
                    </label>
                    {
                        message ?
                        <div className={"messageContainer" + (!isUpdateSuccess ? " error" : " normal")}>
                            <span>{message}</span>
                        </div>
                        : null
                    }
                    <div className="modalContentButtonContainer">
                        <input className="updateButton" type="submit" value="UPDATE" />
                    </div>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    config: state.axiosConfig,
})

export default connect(mapStateToProps)(MyPageForm);