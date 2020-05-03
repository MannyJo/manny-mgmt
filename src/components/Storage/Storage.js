import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Add from '@material-ui/icons/Add';
import axios from 'axios';

import NewStorageForm from './NewStorageForm';

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
                console.log('Error with getting storage :', err);
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
            <div>
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
                    <div key={storage.id} className="outerContainer">
                        <div className="plusIcon">
                            <Add fontSize="small" style={{color: '#fff'}} />
                        </div>
                        <div className="btnContainer">
                            <button onClick={() => deleteStorage(storage.id)} className="button delete">DELETE</button>
                        </div>
                        <Link to={`/section/${storage.id}`}>
                            <div className="itemName">{ storage.name }&nbsp;({ storage.sections.length })</div>
                        </Link>
                    </div>
                ))
            }
            </div>
            <NewStorageForm 
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                user={user}
                addCount={addCount}
                setAddCount={setAddCount}
            />
        </div>
    );
}

export default Storage;