import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Subdirectory from '@material-ui/icons/SubdirectoryArrowRight';

import SectionForm from './SectionForm';

const Section = props => {

    const {
        section,
        addCount,
        setAddCount,
        storageId,
        config
    } = props;

    const [ isHidden, setIsHidden ] = useState(true);

    const deleteSection = sectionId => {
        axios.delete(`/api/storage/section/delete/${sectionId}`, config)
        .then(() => {
            setAddCount(addCount-1);
        }).catch(err => {
            console.error('Error with deleting a section :', err);
        });
    }

    return (
        <div key={section.id} className="subItemContainer">
            <div className="btnContainer">
                <button className="button edit" onClick={() => setIsHidden(false)}>EDIT</button>&nbsp;
                <button onClick={() => deleteSection(section.id)} className="button delete">DELETE</button>
            </div>
            <div className="iconContainer">
                <Subdirectory fontSize="small" style={{color: '#fff'}} />
            </div>
            <Link to={`/food/${section.id}`}>
                <div className="itemName">{section.name}&nbsp;({section.foods.length})</div>
            </Link>
            <SectionForm
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                addCount={addCount}
                setAddCount={setAddCount}
                isUpdate={true}
                section={section}
                storageId={storageId}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    config: state.axiosConfig,
})

export default connect(mapStateToProps)(Section);