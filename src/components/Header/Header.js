import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="header">
            <img src={logo} alt=""></img>
            <nav className="nav">
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/inventory">Manage</Link>
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>
            </nav>
            <div>
                
            </div>
        </div>
    );
};

export default Header;