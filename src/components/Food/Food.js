import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Add from '@material-ui/icons/Add';
import FoodItem from './FoodItem';
import FoodForm from './FoodForm';

const Food = props => {

    const { config } = props;
    const sectionId = window.location.pathname.split('/').pop();
    const [ foods, setFoods ] = useState([]);
    const [ addCount, setAddCount ] = useState(0);
    const [ isHidden, setIsHidden ] = useState(true);

    useEffect(() => {
        document.title = 'Storage > Section > Food';
    }, [ sectionId ]);

    useEffect(() => {
        axios.get(`/api/storage/section/food/${sectionId}`, config)
        .then(results => {
            setFoods(results.data);
        }).catch(err => {
            console.log('Error with getting foods :', err);
        });
    }, [ addCount, sectionId, config ]);

    return (
        <div className="foodContainer">
            <div className="titleContainer">
                <div className="newBtnContainer">
                    <button className="newBtn" onClick={() => setIsHidden(!isHidden)}>
                        <Add />
                    </button>
                </div>
                <h1 className="pageTitle">Food</h1>
            </div>
            <div>
            {
                foods.map(food => (
                    <FoodItem 
                        key={food.id} 
                        food={food} 
                        addCount={addCount}
                        setAddCount={setAddCount}
                        sectionId={sectionId}
                        config={config}
                    />
                ))
            }
            </div>
            <FoodForm 
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                addCount={addCount}
                setAddCount={setAddCount}
                sectionId={sectionId}
                isUpdate={false}
                config={config}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    config: state.axiosConfig,
})

export default connect(mapStateToProps)(Food);