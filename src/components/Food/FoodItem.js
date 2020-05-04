import React from 'react';
import axios from 'axios';

const FoodDetail = props => {
    const food = props.food;
    const purchaseDate = new Date(food.purchaseDate);
    const formattedDate = purchaseDate.getMonth().toString().concat('/').concat(purchaseDate.getDate()).concat('/').concat(purchaseDate.getFullYear());

    const deleteItem = foodId => {
        axios.delete(`http://localhost:8080/api/storage/section/food/delete/${foodId}`)
        .then(() => {
            props.setAddCount(props.addCount-1);
        }).catch(err => {
            console.error('Error with deleting food :', err);
        });
    }

    return (
        <div className="itemOuterContainer">
            <div className="itemInnerContainer">
                <div className="itemTitleContainer">
                    <div className="itemName">{food.name}</div>
                </div>
                <div className="itemContentContainer">
                    <div className="alignRight">QTY :&nbsp;</div>
                    <div className="alignLeft">{food.count}</div>
                    <div className="alignRight">Date of Purchase :&nbsp;</div>
                    <div className="alignLeft">{formattedDate}</div>
                </div>
                <div className="itemNoteContainer" hidden={food.isSetAlarm ? false : true}>
                    <div className="itemNote">It will notify you if this item is gone or less than {food.minCount}.</div>
                </div>
                <div className="itemButtonContainer">
                    <div className="btnContainer item">
                        <button className="button delete" onClick={() => deleteItem(food.id)}>DELETE</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodDetail;