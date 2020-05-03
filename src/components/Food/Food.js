import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Add from '@material-ui/icons/Add';
import FoodDetail from './FoodDetail';
import NewFoodForm from './NewFoodForm';

const Food = () => {

    const sectionId = window.location.pathname.split('/').pop();
    const [ foods, setFoods ] = useState([]);
    const [ addCount, setAddCount ] = useState(0);
    const [ isHidden, setIsHidden ] = useState(true);

    useEffect(() => {
        document.title = 'Storage > Section > Food';
    }, [ sectionId ]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/storage/section/food/${sectionId}`)
        .then(results => {
            setFoods(results.data);
        }).catch(err => {
            console.log('Error with getting foods :', err);
        });
    }, [ addCount, sectionId ]);

    return (
        <div>
            <div>
                <div className="newBtnContainer">
                    <button className="newBtn" onClick={() => setIsHidden(!isHidden)}>
                        <Add />
                    </button>
                </div>
                <h1 className="pageTitle">Food</h1>
            </div>
            <div>
            {
                foods.map(food => <FoodDetail key={food.id} food={food} />)
            }
            </div>
            <NewFoodForm 
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                addCount={addCount}
                setAddCount={setAddCount}
                sectionId={sectionId}
            />
        </div>
    );
}

export default Food;