import React, { useEffect } from 'react';

const Home = () => {

    useEffect(() => {
        document.title = 'Home';
        console.log('Home Page');
    })

    return (
        <h1>This is home page.</h1>
    );
}

export default Home;