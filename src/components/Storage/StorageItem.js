import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Add from '@material-ui/icons/Add';
import Subdirectory from '@material-ui/icons/SubdirectoryArrowRight';

const StorageItem = props => {
    const {
        storage,
        deleteStorage,
        addCount,
        setAddCount
    } = props;

    const deleteSection = sectionId => {
        axios.delete(`http://localhost:8080/api/storage/section/delete/${sectionId}`)
        .then(() => {
            setAddCount(addCount-1);
        }).catch(err => {
            console.error('Error with deleting a section :', err);
        });
    }

    return (
        <div className="outerContainer">
            <div className="innerContainer">
                <div className="btnContainer">
                    <button onClick={() => deleteStorage(storage.id)} className="button delete">DELETE</button>
                </div>
                <div className="iconContainer">
                    <Add fontSize="small" style={{color: '#fff'}} />
                </div>
                <div className="itemName">
                    { storage.name }&nbsp;({ storage.sections.length })
                </div>
            </div>
            <div className="subContainer">
            {
                storage.sections.map(section => (
                    <div key={section.id} className="subItemContainer">
                        <div className="btnContainer">
                            <button onClick={() => deleteSection(section.id)} className="button delete">DELETE</button>
                        </div>
                        <div className="iconContainer">
                            <Subdirectory fontSize="small" style={{color: '#fff'}} />
                        </div>
                        <Link to={`/food/${section.id}`}>
                            <div className="itemName">{section.name}&nbsp;({section.foods.length})</div>
                        </Link>
                    </div>
                ))
            }
            </div>
        </div>
    );
}

export default StorageItem;