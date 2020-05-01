import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Section = () => {

    const storageId = window.location.pathname.split('/').pop();
    const [ sections, setSections ] = useState([]);
    const [ sectionName, setSectionName ] = useState('');
    const [ addCount, setAddCount ] = useState(0);
    const [ isHidden, setIsHidden ] = useState(true);

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

    const clickSubmit = e => {
        e.preventDefault();
        console.log(sectionName);

        if(sectionName.length > 0) {
            const sectionObj = {
                name: sectionName,
                storage: {
                    id: storageId
                }
            };

            addNewSection(sectionObj);
        }
    }

    const addNewSection = newSection => {
        axios.post('http://localhost:8080/api/storage/section/add', newSection)
        .then(() => {
            setAddCount(addCount+1);
            setSectionName('');
        }).catch(err => {
            console.error('Error with adding new section :', err);
        });
    }

    const deleteSection = id => {
        console.log(id);
        axios.delete(`http://localhost:8080/api/storage/section/delete/${id}`)
        .then(() => {
            setAddCount(addCount-1);
        }).catch(err => {
            console.error('Error with deleting section :', err);
        });
    }

    return (
        <div>
            <h1>Section Page</h1>
            <div>
            {
                sections.map(section => (
                    <div key={section.id}>
                        <Link to={`/food/${section.id}`}>
                            {section.name}({section.foods.length})
                        </Link>
                        <button onClick={() => deleteSection(section.id)}>DELETE</button>
                    </div>
                ))
            }
            </div>
            <div>
                <button onClick={() => setIsHidden(!isHidden)}>Open Section Form</button>
            </div>
            <div hidden={isHidden}>
                <hr/>
                <form onSubmit={clickSubmit}>
                    <label htmlFor="sectionName">Name :&nbsp; 
                        <input 
                            type="text" 
                            name="sectionName" 
                            id="sectionName" 
                            placeholder="New Section's Name" 
                            value={sectionName}
                            onChange={e => setSectionName(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="ADD" />
                </form>
            </div>
        </div>
    );
}

export default Section;