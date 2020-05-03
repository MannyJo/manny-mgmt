import React, { useState } from 'react';
import axios from 'axios';

const NewStorageForm = props => {
    const [ storageName, setStorageName ] = useState('');

    // Submit the storage information
    const clickSubmit = e => {
        e.preventDefault();

        if(storageName.length > 0) {
            const storageObj = {
                name: storageName,
                users: Array.of(props.user)
            };

            addNewStorage(storageObj);
        }
    }

    // Send new storage to the server
    const addNewStorage = newStorage => {
        axios.post('http://localhost:8080/api/storage/add', newStorage)
        .then(() => {
            props.setAddCount(props.addCount+1);
            setStorageName('');
            props.setIsHidden(true);
        }).catch(err => {
            console.error('Error with adding new storage :', err);
        });
    }

    const closeModal = e => e.target.className === 'modal' ? props.setIsHidden(true) : null;

    return (
        <div className="modal" hidden={props.isHidden} onClick={closeModal}>
            <div className="modalContent">
                <div className="modalTitleContainer">
                    <span className="modalClose" onClick={() => props.setIsHidden(true)}>&times;</span>
                    <div>New Storage</div>
                </div>
                <form className="modalContentContainer" onSubmit={clickSubmit}>
                    <label className="modalLabel" htmlFor="storageName">Name</label>
                    <input 
                        type="text" 
                        name="storageName" 
                        className="modalInput"
                        placeholder="New Storage's Name" 
                        value={storageName}
                        onChange={e => setStorageName(e.target.value)}
                    />
                    <div className="modalContentButtonContainer">
                        <input className="addButton" type="submit" value="ADD" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewStorageForm;