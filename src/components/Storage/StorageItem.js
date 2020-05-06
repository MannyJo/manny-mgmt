import React, { useState } from 'react';
import Add from '@material-ui/icons/Add';

import StorageForm from './StorageForm';
import Section from '../Section/Section';
import SectionForm from '../Section/SectionForm';

const StorageItem = props => {
    const {
        storage,
        deleteStorage,
        addCount,
        setAddCount,
        user
    } = props;
    const [ isHidden , setIsHidden ] = useState(true);
    const [ isSectionHidden, setIsSectionHidden ] = useState(true);
    const [ isSubHidden, setIsSubHidden ] = useState(true);

    return (
        <div className="outerContainer">
            <div 
                className="innerContainer" 
                onClick={e => e.target.tagName === 'svg' || !e.target.className.includes('button') ? setIsSubHidden(!isSubHidden) : null}
            >
                <div className="btnContainer">
                    <button className="button add" onClick={() => setIsSectionHidden(false)}>ADD</button>&nbsp;
                    <button className="button edit" onClick={() => setIsHidden(false)}>EDIT</button>&nbsp;
                    <button className="button delete" onClick={() => deleteStorage(storage.id)}>DELETE</button>
                </div>
                <div className="iconContainer">
                    <Add onClick={() => setIsSubHidden(!isSubHidden)} fontSize="small" style={{color: '#fff'}} />
                </div>
                <div className="itemName">
                    { storage.name }&nbsp;({ storage.sections.length })
                </div>
            </div>
            <div className="subContainer" hidden={isSubHidden}>
            {
                storage.sections.map(section => (
                    <Section
                        key={section.id}
                        section={section}
                        addCount={addCount}
                        setAddCount={setAddCount}
                        storageId={storage.id}
                    />
                ))
            }
            </div>
            <div>
                <StorageForm 
                    isHidden={isHidden}
                    setIsHidden={setIsHidden}
                    user={user}
                    addCount={addCount}
                    setAddCount={setAddCount}
                    isUpdate={true}
                    storage={storage}
                />
                <SectionForm
                    isHidden={isSectionHidden}
                    setIsHidden={setIsSectionHidden}
                    addCount={addCount}
                    setAddCount={setAddCount}
                    isUpdate={false}
                    storageId={storage.id}
                />
            </div>
        </div>
    );
}

export default StorageItem;