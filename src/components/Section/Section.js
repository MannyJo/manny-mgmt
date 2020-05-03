import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Add from '@material-ui/icons/Add';
import axios from 'axios';

import NewSectionForm from './NewSectionForm';

const Section = () => {

    const storageId = window.location.pathname.split('/').pop();
    const [ sections, setSections ] = useState([]);
    const [ isHidden, setIsHidden ] = useState(true);
    const [ addCount, setAddCount ] = useState(0);

    useEffect(() => {
        document.title = 'Storage > Section';
    }, [ storageId ]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/storage/section/${storageId}`)
        .then(results => {
            setSections(results.data);
        }).catch(err => {
            console.log('Error with getting sections :', err);
        });
    }, [ addCount, storageId ]);

    const deleteSection = sectionId => {
        axios.delete(`http://localhost:8080/api/storage/section/delete/${sectionId}`)
        .then(() => {
            setAddCount(addCount-1);
        }).catch(err => {
            console.error('Error with deleting a section :', err);
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
                <h1 className="pageTitle">Section</h1>
            </div>
            <div>
            {
                sections.map(section => (
                    <div key={section.id} className="outerContainer">
                        <div className="btnContainer">
                            <button onClick={() => deleteSection(section.id)} className="button delete">DELETE</button>
                        </div>
                        <div className="plusIcon">
                            <Add fontSize="small" style={{color: '#fff'}} />
                        </div>
                        <Link to={`/food/${section.id}`}>
                            <div className="itemName">{section.name}&nbsp;({section.foods.length})</div>
                        </Link>
                    </div>
                ))
            }
            </div>
            <NewSectionForm
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                storageId={storageId}
                addCount={addCount}
                setAddCount={setAddCount}
            />
        </div>
    );
}

export default Section;