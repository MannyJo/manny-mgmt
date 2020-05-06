import React, { useState, useEffect } from 'react';
import Add from '@material-ui/icons/Add';
import axios from 'axios';

import StorageItem from './StorageItem';
import StorageForm from './StorageForm';

const Storage = () => {

    const user = { id: 1 };
    const [ storages, setStorages ] = useState([]);
    const [ isHidden , setIsHidden ] = useState(true);
    const [ addCount, setAddCount ] = useState(0);

    // Change the title
    useEffect(() => {
        document.title = 'Storage';
    }, [ user.id ]);

    // Get user's storage items
    useEffect(() => {
        const getAllStorage = userId => {
            axios.get(`http://localhost:8080/api/storage/${userId}`)
            .then(results => {
                setStorages(results.data);
            }).catch(err => {
                console.error('Error with getting storage :', err);
            });
        };

        getAllStorage(user.id);
    }, [ addCount, user.id ]);

    // Delete the clicked item
    const deleteStorage = storageId => {
        axios.delete(`http://localhost:8080/api/storage/delete/${storageId}`)
        .then(() => {
            setAddCount(addCount-1);
        }).catch(err => {
            console.error('Error with deleting a storage :', err);
        });
    }

    return (
        <div>
            <div className="titleContainer">
                <div className="newBtnContainer">
                    <button className="newBtn" onClick={() => setIsHidden(!isHidden)}>
                        <Add />
                    </button>
                </div>
                <h1 className="pageTitle">Storage</h1>
            </div>
            <div>
            {
                storages.map(storage => (
                    <StorageItem
                        key={storage.id}
                        storage={storage}
                        deleteStorage={deleteStorage}
                        addCount={addCount}
                        setAddCount={setAddCount}
                        user={user}
                    />
                ))
            }
            </div>
            <StorageForm 
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                user={user}
                addCount={addCount}
                setAddCount={setAddCount}
                storages={storages}
                isUpdate={false}
            />
        </div>
    );
}

export default Storage;