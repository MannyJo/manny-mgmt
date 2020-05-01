import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodDetail from './FoodDetail';

const Food = () => {

    const sectionId = window.location.pathname.split('/').pop();
    const DEFAULT_FOOD = {
        name: '',
        count: 0,
        minCount: 0,
        isSetAlarm: false,
        purchaseDate: new Date().toISOString().substr(0, 10),
        section: { id: sectionId }
    };
    const [ food, setFood ] = useState(DEFAULT_FOOD);
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

    const clickSubmit = e => {
        e.preventDefault();

        if(food.name.length > 0) {
            addNewFood(food);
        }
    }

    const addNewFood = newFood => {
        axios.post('http://localhost:8080/api/storage/section/food/add', newFood)
        .then(() => {
            setAddCount(addCount+1);
            setFood(DEFAULT_FOOD);
        }).catch(err => {
            console.error('Error with adding new food :', err);
        });
    }

    const handleChangeFor = name => e => {
        const foodObj = { 
            ...food, 
            [name]: name === 'isSetAlarm' ? e.target.checked : e.target.value 
        };
        setFood(foodObj);
    }

    return (
        <div>
            <h1>Food Page</h1>
            <div>
            {
                foods.map(food => <FoodDetail key={food.id} food={food} />)
            }
            </div>
            <div>
                <button onClick={() => setIsHidden(!isHidden)}>Open Food Form</button>
            </div>
            <div hidden={isHidden}>
                <hr/>
                <form onSubmit={clickSubmit}>
                    <label htmlFor="foodName">Name :&nbsp;
                        <input
                            type="text"
                            name="foodName"
                            value={food.name}
                            onChange={handleChangeFor('name')}
                        />
                    </label><br/>
                    <label htmlFor="foodCount">Count :&nbsp;
                        <input
                            type="number"
                            name="foodCount"
                            value={food.count}
                            onChange={handleChangeFor('count')}
                        />
                    </label><br/>
                    <label htmlFor="foodMinCount">Minimum Count :&nbsp;
                        <input
                            type="number"
                            name="foodMinCount"
                            value={food.minCount}
                            onChange={handleChangeFor('minCount')}
                        />
                    </label><br/>
                    <label htmlFor="foodAlarm">Alarm :&nbsp;
                        <input
                            type="checkbox"
                            name="foodAlarm"
                            value={food.isSetAlarm}
                            onChange={handleChangeFor('isSetAlarm')}
                        />
                    </label><br/>
                    <label htmlFor="foodPurchaseDate">Date of Purchase :&nbsp;
                        <input
                            type="date"
                            name="foodPurchaseDate"
                            value={food.purchaseDate}
                            onChange={handleChangeFor('purchaseDate')}
                        />
                    </label><br/>
                    <input type="submit" value="ADD" />
                </form>
            </div>
        </div>
    );
}

export default Food;