import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Storage = () => {

    const user = { id: 1 };
    const [ storageName, setStorageName ] = useState('');
    const [ storages, setStorages ] = useState([]);
    const [ isHidden , setIsHidden ] = useState(true);
    const [ addCount, setAddCount ] = useState(0);

    // Change the title
    useEffect(() => {
        document.title = 'Storage';
        console.log('Storage Page');
    }, [ user.id ]);

    // Get user's storage items
    useEffect(() => {
        const getAllStorage = userId => {
            axios.get(`http://localhost:8080/api/storage/${userId}`)
            .then(results => {
                setStorages(results.data);
            }).catch(err => {
                console.log('Error with getting storage :', err);
            });
        };

        getAllStorage(user.id);
    }, [ addCount, user.id ]);

    // Submit the storage information
    const clickSubmit = e => {
        e.preventDefault();

        if(storageName.length > 0) {
            const storageObj = {
                name: storageName,
                users: Array.of(user)
            };

            addNewStorage(storageObj);
        }
    }

    // Send new storage to the server
    const addNewStorage = newStorage => {
        axios.post('http://localhost:8080/api/storage/add', newStorage)
        .then(() => {
            setAddCount(addCount+1);
            setStorageName('');
        }).catch(err => {
            console.error('Error with adding new storage :', err);
        });
    }

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
            <h1>Storage Page</h1>
            <div>
            {
                storages.map(storage => (
                    <div key={storage.id}>
                        <Link to={`/section/${storage.id}`}>
                            { storage.name }({ storage.sections.length })
                        </Link>
                        <button onClick={() => deleteStorage(storage.id)}>DELETE</button>
                    </div>
                ))
            }
            </div>
            <div>
                <button onClick={() => setIsHidden(!isHidden)}>Open Storage Form</button>
            </div>
            <div hidden={isHidden}>
                <hr/>
                <h2>Add New Storage Form</h2>
                <form onSubmit={clickSubmit}>
                    <label htmlFor="storageName">Name :&nbsp; 
                        <input 
                            type="text" 
                            name="storageName" 
                            id="storageName" 
                            placeholder="New Storage's Name" 
                            value={storageName}
                            onChange={e => setStorageName(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="ADD" />
                </form>
            </div>
        </div>
    );
}

export default Storage;