import React, { useState } from 'react';
import axios from 'axios';

const StorageForm = props => {
    const {
        isHidden,
        setIsHidden,
        user,
        addCount,
        setAddCount,
        isUpdate,
        storage
    } = props;

    const DEFAULT_STORAGE = isUpdate ? {
            id: storage.id,
            name: storage.name,
            users: Array.of(user)
        } : {
            name: '',
            users: Array.of(user)
        };

    const [ storageObj, setStorageObj ] = useState(DEFAULT_STORAGE);

    // Submit the storage information
    const clickSubmit = e => {
        e.preventDefault();

        if(storageObj.name.length > 0) {
            if(isUpdate) {
                updateStorage(storageObj);
            } else {
                addNewStorage(storageObj);
            }
        } else {
            // new name is empty
        }
    }

    const updateStorage = storageObj => {
        axios.put('http://localhost:8080/api/storage/update', storageObj)
        .then(() => {
            setDefault();
        }).catch(err => {
            console.error('Error with adding new storage :', err);
        });
    }

    // Send new storage to the server
    const addNewStorage = newStorage => {
        axios.post('http://localhost:8080/api/storage/add', newStorage)
        .then(() => {
            setDefault();
        }).catch(err => {
            console.error('Error with adding new storage :', err);
        });
    }

    const setDefault = () => {
        setAddCount(addCount+1);
        setStorageObj(isUpdate ? storageObj : DEFAULT_STORAGE);
        setIsHidden(true);
    }

    const closeModal = e => {
        if(e.target.className === 'modal' || e.target.className === 'modalClose') {
            setStorageObj(DEFAULT_STORAGE);
            setIsHidden(true);
        }
    };

    return (
        <div className="modal" hidden={isHidden} onClick={closeModal}>
            <div className="modalContent">
                <div className="modalTitleContainer">
                    <span className="modalClose" onClick={closeModal}>&times;</span>
                    <div>
                        <span>{isUpdate ? 'Edit' : 'New'} Storage</span>
                    </div>
                </div>
                <form className="modalContentContainer" onSubmit={clickSubmit}>
                    <label className="modalLabel" htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        className="modalInput"
                        placeholder="Name" 
                        value={storageObj.name}
                        onChange={e => setStorageObj({ ...storageObj, name: e.target.value })}
                    />
                    <div className="modalContentButtonContainer">
                    {
                        isUpdate ?
                        <input className="updateButton" type="submit" value="UPDATE" />
                        : <input className="addButton" type="submit" value="ADD" />
                    }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StorageForm;