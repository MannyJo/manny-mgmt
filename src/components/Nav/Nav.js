import React from 'react';
import {
    Link
} from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="navigation">
            <Link to="/">Home</Link>
            <Link to="/storage">Storage</Link>
            <Link to="/mypage">My Page</Link>
        </nav>
    );
}

export default Nav;