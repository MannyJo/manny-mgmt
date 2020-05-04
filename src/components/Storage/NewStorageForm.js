import React, { useState } from 'react';
import axios from 'axios';

const NewStorageForm = props => {
    const {
        isHidden,
        setIsHidden,
        user,
        addCount,
        setAddCount,
        storages
    } = props;
    const [ newName, setNewName ] = useState('');
    const [ isStorage, setIsStorage ] = useState(true);
    const [ storageId, setStorageId ] = useState(0);

    // Submit the storage information
    const clickSubmit = e => {
        e.preventDefault();

        if(newName.length > 0) {
            if(isStorage) {
                const storageObj = {
                    name: newName,
                    users: Array.of(user)
                };
    
                addNewStorage(storageObj);
            } else {
                if(storageId > 0) {
                    const sectionObj = {
                        name: newName,
                        storage: { id: storageId }
                    };
        
                    addNewSection(sectionObj);
                } else {
                    // storage id is 0
                }
            }
        } else {
            // new name is empty
        }
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

    const addNewSection = newSection => {
        axios.post('http://localhost:8080/api/storage/section/add', newSection)
        .then(() => {
            setDefault();
        }).catch(err => {
            console.error('Error with adding new section :', err);
        });
    }

    const setDefault = () => {
        setAddCount(addCount+1);
        setNewName('');
        setStorageId(0);
        setIsStorage(true);
        setIsHidden(true);
    }

    const closeModal = e => e.target.className === 'modal' ? setIsHidden(true) : null;

    return (
        <div className="modal" hidden={isHidden} onClick={closeModal}>
            <div className="modalContent">
                <div className="modalTitleContainer">
                    <span className="modalClose" onClick={() => setIsHidden(true)}>&times;</span>
                    <div>
                        <span>New </span>
                        <select 
                            value={isStorage}
                            onChange={e => setIsStorage(e.target.value === 'true' ? true : false)}
                            className="modalTitleSelect"
                        >
                            <option value={true}>Storage</option>
                            <option value={false}>Section</option>
                        </select>
                    </div>
                </div>
                <form className="modalContentContainer" onSubmit={clickSubmit}>
                    <div className="storageSelectContainer" hidden={isStorage}>
                        <label className="modalLabel" htmlFor="storageSelect">Storage</label>
                        <select
                            className="modalInput" 
                            onChange={e => setStorageId(parseInt(e.target.value))} 
                        >
                            <option value={0}>===== SELECT =====</option>
                            {
                                storages.map(storage => (
                                    <option key={storage.id} value={storage.id}>{storage.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <label className="modalLabel" htmlFor="newName">Name</label>
                    <input 
                        type="text" 
                        name="newName" 
                        className="modalInput"
                        placeholder="Name" 
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
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