import React, { useState } from 'react';
import axios from 'axios';

const NewFoodForm = props => {

    const DEFAULT_FOOD = {
        name: '',
        count: 0,
        minCount: 0,
        isSetAlarm: false,
        purchaseDate: new Date().toISOString().substr(0, 10),
        section: { id: props.sectionId }
    };
    const [ food, setFood ] = useState(DEFAULT_FOOD);

    const clickSubmit = e => {
        e.preventDefault();

        if(food.name.length > 0) {
            addNewFood(food);
        }
    }

    const addNewFood = newFood => {
        axios.post('http://localhost:8080/api/storage/section/food/add', newFood)
        .then(() => {
            props.setAddCount(props.addCount+1);
            setFood(DEFAULT_FOOD);
        }).catch(err => {
            console.error('Error with adding new food :', err);
        });
    }

    const handleChangeFor = name => e => {
        const val = e.target.value;
        const updatedVal = name !== 'isSetAlarm' ? val : val === 'true' ? true : false;
            
        setFood({ ...food, [name]: updatedVal });
    }

    const closeModal = e => e.target.className === 'modal' ? props.setIsHidden(true) : null;

    return (
        <div className="modal" hidden={props.isHidden} onClick={closeModal}>
            <div className="modalContent">
                <div className="modalTitleContainer">
                    <span className="modalClose" onClick={() => props.setIsHidden(true)}>&times;</span>
                    <div>New Food</div>
                </div>
                <form className="modalContentContainer" onSubmit={clickSubmit}>
                    <label className="modalLabel" htmlFor="foodName">Name</label>
                    <input
                        type="text"
                        name="foodName"
                        className="modalInput"
                        value={food.name}
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
                        <input className="addButton" type="submit" value="ADD" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewFoodForm;