import React from 'react';
import Menu from '@material-ui/icons/Menu';

const NavBar = props => {
    const {
        hidden,
        setHidden
    } = props;

    return (
        <nav className="navBar">
            <div onClick={() => setHidden(!hidden)} className="navButton">
                <Menu fontSize="large" />
            </div>
        </nav>
    );
}

export default NavBar;