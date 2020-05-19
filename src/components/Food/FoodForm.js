import React, { useState } from 'react';
import axios from 'axios';

const FoodForm = props => {

    const {
        isHidden,
        setIsHidden,
        addCount,
        setAddCount,
        sectionId,
        isUpdate,
        food : targetFood,
        config
    } = props;

    const DEFAULT_FOOD = 
        isUpdate ? {
            id: targetFood.id,
            name: targetFood.name,
            count: targetFood.count,
            minCount: targetFood.minCount,
            isSetAlarm: targetFood.isSetAlarm,
            purchaseDate: targetFood.purchaseDate.substr(0, 10),
            section: { id: sectionId }
        } : 
        {
            name: '',
            count: 0,
            minCount: 0,
            isSetAlarm: false,
            purchaseDate: new Date().toISOString().substr(0, 10),
            section: { id: sectionId }
        };

    const [ food, setFood ] = useState(DEFAULT_FOOD);

    const clickSubmit = e => {
        e.preventDefault();

        if(food.name.length > 0) {
            if(isUpdate) {
                updateFood(food);
            } else {
                addNewFood(food);
            }
        }
    }

    const updateFood = foodObj => {
        axios.put('/api/storage/section/food/update', foodObj, config)
        .then(() => {
            setDefault();
        }).catch(err => {
            console.error('Error with updating food :', err);
        })
    }

    const addNewFood = newFood => {
        axios.post('/api/storage/section/food/add', newFood, config)
        .then(() => {
            setDefault();
        }).catch(err => {
            console.error('Error with adding new food :', err);
        });
    }

    const setDefault = () => {
        setAddCount(addCount+1);
        setFood(DEFAULT_FOOD);
        setIsHidden(true);
    }

    const handleChangeFor = name => e => {
        const val = e.target.value;
        const updatedVal = name !== 'isSetAlarm' ? val : val === 'true' ? true : false;
            
        setFood({ ...food, [name]: updatedVal });
    }

    const closeModal = e => {
        if(e.target.className === 'modal' || e.target.className === 'modalClose') {
            setFood(DEFAULT_FOOD);
            setIsHidden(true);
        }
    };

    return (
        <div className="modal" hidden={isHidden} onClick={closeModal}>
            <div className="modalContent">
                <div className="modalTitleContainer">
                    <span className="modalClose" onClick={closeModal}>&times;</span>
                    <div>{ isUpdate ? 'Edit' : 'New' } Food</div>
                </div>
                <form className="modalContentContainer" onSubmit={clickSubmit}>
                    <label className="modalLabel" htmlFor="foodName">Name</label>
                    <input
                        type="text"
                        name="foodName"
                        className="modalInput"
                        value={food.name}
                        placeholder="New Food's Name"
                        onChange={handleChangeFor('name')}
                    />
                    <label className="modalLabel" htmlFor="foodCount">Count</label>
                    <input
                        type="number"
                        name="foodCount"
                        className="modalInput"
                        value={food.count}
                        onChange={handleChangeFor('count')}
                    />
                    <label className="modalLabel" htmlFor="foodMinCount">Minimum Count</label>
                    <input
                        type="number"
                        name="foodMinCount"
                        className="modalInput"
                        value={food.minCount}
                        onChange={handleChangeFor('minCount')}
                    />
                    <label className="modalLabel">Alarm</label>
                    <div className="modalRadioSet">
                        <input
                            type="radio"
                            name="foodAlarmSet"
                            value={true}
                            onChange={handleChangeFor('isSetAlarm')}
                            checked={food.isSetAlarm === true ? true : false}
                        /><label htmlFor="foodAlarmSet" className="modalRadioLabel">Set</label>
                        <input
                            type="radio"
                            name="foodAlarmUnset"
                            value={false}
                            onChange={handleChangeFor('isSetAlarm')}
                            checked={food.isSetAlarm === false ? true : false}
                        /><label htmlFor="foodAlarmUnset" className="modalRadioLabel">Unset</label>
                    </div>
                    <label className="modalLabel" htmlFor="foodPurchaseDate">Date of Purchase</label>
                    <input
                        type="date"
                        name="foodPurchaseDate"
                        className="modalInput"
                        value={food.purchaseDate}
                        onChange={handleChangeFor('purchaseDate')}
                    />
                    <div className="modalContentButtonContainer">
                        {
                            isUpdate ?
                            <input className="updateButton" type="submit" value="UPDATE" />
                            : <input className="addButton" type="submit" value="ADD" />
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FoodForm;