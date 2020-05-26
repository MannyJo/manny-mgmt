import React, { useState } from 'react';
import axios from '../../axios';
import FoodForm from './FoodForm';

const FoodDetail = props => {

    const {
        food,
        addCount,
        setAddCount,
        sectionId,
        config
    } = props;
    const purchaseDate = food.purchaseDate.substr(0, 10).split('-');
    const formattedDate = purchaseDate[1] + '/' + purchaseDate[2] + '/' + purchaseDate[0];
    const [ isHidden, setIsHidden ] = useState(true);

    const deleteItem = foodId => {
        axios.delete(`/api/storage/section/food/delete/${foodId}`, config)
        .then(() => {
            setAddCount(addCount-1);
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
                        <button className="button edit" onClick={() => setIsHidden(false)}>EDIT</button>&nbsp;
                        <button className="button delete" onClick={() => deleteItem(food.id)}>DELETE</button>
                    </div>
                </div>
            </div>
            <FoodForm 
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                addCount={addCount}
                setAddCount={setAddCount}
                sectionId={sectionId}
                isUpdate={true}
                food={food}
                config={config}
            />
        </div>
    );
}

export default FoodDetail;