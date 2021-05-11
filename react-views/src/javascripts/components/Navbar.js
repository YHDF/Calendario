import React from 'react';
import {

    Link,

} from "react-router-dom";

const Navbar = () => {
    function slide(e) {
        let list = document.querySelector('.list');
        list.classList.contains('menu-active') ? list.classList.remove('menu-active') : list.classList.toggle('menu-active');
    }
    return (
        <div className="Navbar">
            <div className="menu" onClick={slide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-list"
                    viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </div>
            <div className="list">
                <Link to="/">Home</Link>
                <Link to="/auth/connect">Admin</Link>
                <Link to="/">About</Link>
            </div>
            <div className="connect"><Link to="">Login</Link></div>
            <div className="join"><Link to="">Sign up</Link></div>


        </div>
    );
}

export default Navbar