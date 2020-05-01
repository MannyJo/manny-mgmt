import React from 'react';

const FoodDetail = props => {
    const food = props.food;
    return (
        <div>
            <div hidden>ID : {food.id}</div>
            <div>Name : {food.name}</div>
            <div>Count : {food.count}</div>
            <div>Minimum Count : {food.minCount}</div>
            <div>Alarm : {food.isSetAlarm ? 'True' : 'False'}</div>
            <div>Purchase Date : <input type="date" defaultValue={food.purchaseDate.substring(0, 10)} disabled /></div>
            <hr/>
        </div>
    );
}

export default FoodDetail;