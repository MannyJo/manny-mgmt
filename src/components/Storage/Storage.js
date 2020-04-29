import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Storage = () => {

    const [ storage, setStorage ] = useState({});
    const [ sectionCount, setSectionCount ] = useState(0);

    useEffect(() => {
        document.title = 'Storage';
        getAllStorage(1);
        console.log('Storage');
    }, [ sectionCount ])

    const getAllStorage = id => {
        Axios.get(`http://localhost:8080/api/storage/${id}`)
        .then(results => {
            setStorage(results.data);
            setSectionCount(results.data.sections.length);
        }).catch(err => {
            console.log('Error with getting storage :', err);
        });
    }

    return (
        <div>
            <h1>Storage Page</h1>
            <Link to={`/section/${storage.id}`}>
                <div>{ storage.name }({ sectionCount })</div>
            </Link>
        </div>
    );
}

export default Storage;