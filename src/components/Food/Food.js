import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodDetail from './FoodDetail';

const Food = () => {

    const sectionId = window.location.pathname.split('/').pop();
    const [ foods, setFoods ] = useState([]);

    useEffect(() => {
        console.log('section id :', sectionId);
        axios.get(`http://localhost:8080/api/storage/food/${sectionId}`)
        .then(results => {
            setFoods(results.data);
        }).catch(err => {
            console.log('Error with getting foods :', err);
        });
    }, [ sectionId ])

    return (
        <div>
            <h1>Food Page</h1>
            <div>
            {
                foods.map(food => <FoodDetail key={food.id} food={food} />)
            }
            </div>
        </div>
    );
}

export default Food;