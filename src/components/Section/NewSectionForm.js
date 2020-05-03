import React, { useState } from 'react';
import axios from 'axios';

const NewSectionForm = props => {
    const [ sectionName, setSectionName ] = useState('');

    const clickSubmit = e => {
        e.preventDefault();

        if(sectionName.length > 0) {
            const sectionObj = {
                name: sectionName,
                storage: { id: props.storageId }
            };

            addNewSection(sectionObj);
        }
    }

    const addNewSection = newSection => {
        axios.post('http://localhost:8080/api/storage/section/add', newSection)
        .then(() => {
            props.setAddCount(props.addCount+1);
            setSectionName('');
            props.setIsHidden(true);
        }).catch(err => {
            console.error('Error with adding new section :', err);
        });
    }

    const closeModal = e => e.target.className === 'modal' ? props.setIsHidden(true) : null;

    return (
        <div className="modal" hidden={props.isHidden} onClick={closeModal}>
            <div className="modalContent">
                <div className="modalTitleContainer">
                    <span className="modalClose" onClick={() => props.setIsHidden(true)}>&times;</span>
                    <div>New Section</div>
                </div>
                <form className="modalContentContainer" onSubmit={clickSubmit}>
                    <label className="modalLabel" htmlFor="sectionName">Name</label>
                    <input 
                        type="text" 
                        name="sectionName" 
                        className="modalInput"
                        placeholder="New Section's Name" 
                        value={sectionName}
                        onChange={e => setSectionName(e.target.value)}
                    />
                    <div className="modalContentButtonContainer">
                        <input className="addButton" type="submit" value="ADD" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewSectionForm;