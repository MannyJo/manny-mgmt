import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Section = () => {

    const [ sections, setSections ] = useState([]);
    const storageId = window.location.pathname.split('/').pop();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/storage/section/${storageId}`)
        .then(results => {
            setSections(results.data);
        }).catch(err => {
            console.log('Error with getting sections :', err);
        });
    }, [ storageId ]);

    return (
        <div>
            <h1>Section Page</h1>
            <div>
            {
                sections.map(section => <Link to={`/food/${section.id}`} key={section.id}>{section.name}({section.foods.length})</Link>)
            }
            </div>
        </div>
    );
}

export default Section;