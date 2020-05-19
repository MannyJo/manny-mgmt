import React, { useState, useEffect } from 'react';
import Add from '@material-ui/icons/Add';
import axios from 'axios';
import { connect } from 'react-redux';

import StorageItem from './StorageItem';
import StorageForm from './StorageForm';

const Storage = props => {

    const {
        userInfo: user,
        config
    } = props;
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
            axios.get(`/api/storage/${userId}`, config)
            .then(results => {
                setStorages(results.data);
            }).catch(err => {
                console.error('Error with getting storage :', err);
            });
        };

        getAllStorage(user.id);
    }, [ addCount, user.id, config ]);

    // Delete the clicked item
    const deleteStorage = storageId => {
        axios.delete(`/api/storage/delete/${storageId}`, config)
        .then(() => {
            setAddCount(addCount-1);
        }).catch(err => {
            console.error('Error with deleting a storage :', err);
        });
    }

    return (
        <div className="storageContainer">
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
                storages.length > 0 && storages.map(storage => (
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

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    config: state.axiosConfig,
})

export default connect(mapStateToProps)(Storage);