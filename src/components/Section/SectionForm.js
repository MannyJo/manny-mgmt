import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const SectionForm = props => {
    const {
        isHidden,
        setIsHidden,
        addCount,
        setAddCount,
        isUpdate,
        section,
        storageId,
        config
    } = props;

    const DEFAULT_SECTION = isUpdate ? {
            id: section.id,
            name: section.name,
            storage: { id: storageId }
        } : {
            name: '',
            storage: { id: storageId }
        };

    const [ sectionObj, setSectionObj ] = useState(DEFAULT_SECTION);

    // Submit the storage information
    const clickSubmit = e => {
        e.preventDefault();

        if(sectionObj.name.length > 0) {
            if(isUpdate) {
                updateSection(sectionObj);
            } else {
                addNewSection(sectionObj);
            }
        } else {
            // new name is empty
        }
    }

    const updateSection = sectionObj => {
        axios.put('/api/storage/section/update', sectionObj, config)
        .then(() => {
            setDefault();
        }).catch(err => {
            console.error('Error with updating section :', err);
        });
    }

    // Send new storage to the server
    const addNewSection = newStorage => {
        axios.post('/api/storage/section/add', newStorage, config)
        .then(() => {
            setDefault();
        }).catch(err => {
            console.error('Error with adding new section :', err);
        });
    }

    const setDefault = () => {
        setAddCount(addCount+1);
        setSectionObj(isUpdate ? sectionObj : DEFAULT_SECTION);
        setIsHidden(true);
    }

    const closeModal = e => {
        if(e.target.className === 'modal' || e.target.className === 'modalClose') {
            setSectionObj(DEFAULT_SECTION);
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
                        value={sectionObj.name}
                        onChange={e => setSectionObj({ ...sectionObj, name: e.target.value })}
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

const mapStateToProps = (state) => ({
    config: state.axiosConfig,
})

export default connect(mapStateToProps)(SectionForm);