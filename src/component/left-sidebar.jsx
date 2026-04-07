import React from "react";
import { NavLink } from "react-router-dom";

import Profilepic from "../image/profile.jpg";

const LeftSideBar = () => {
    return(
        <div className="sidebar">
            <div className="profile">
                <div className="profile-pic">
                    <img src={Profilepic} alt="profile" className="profile-image"/>
                </div>
                <div className="profile-name">
                    <h2 className="name">Aathi</h2>
                    <div className="green-line"></div>
                </div>
            </div>
            <div className="details">
                <div className="slider-bar">
                    <NavLink to="/" className={({isActive}) => isActive ? "slider-link highlight-slider" : "slider-link"}><i className="fa-solid fa-clipboard"></i> DashBoard</NavLink>
                </div>
                <div className="slider-bar">
                    <NavLink to="/calendar" className={({isActive}) => isActive ? "slider-link highlight-slider" : "slider-link"}><i className="fa-solid fa-calendar"></i> Calendar</NavLink>
                </div>
                <div className="slider-bar">
                    <NavLink to="/profile" className={({isActive}) => isActive ? "slider-link highlight-slider" : "slider-link"}><i className="fa-solid fa-user"></i> Profile</NavLink>
                </div>
                <div className="slider-bar">
                    <NavLink to="/inbox" className={({isActive}) => isActive ? "slider-link highlight-slider" : "slider-link"}><i className="fa-solid fa-envelope"></i> Inbox</NavLink>
                </div>
                <div className="slider-bar">
                    <NavLink to="/table" className={({isActive}) => isActive ? "slider-link highlight-slider" : "slider-link"}><i className="fa-solid fa-table-list"></i> Table</NavLink>
                </div>
                <div className="slider-bar">
                    <NavLink to="/billing" className={({isActive}) => isActive ? "slider-link highlight-slider" : "slider-link"}><i className="fa-solid fa-credit-card"></i> Billing</NavLink>
                </div>
                <div className="slider-bar">
                    <NavLink to="/pages" className={({isActive}) => isActive ? "slider-link highlight-slider" : "slider-link"}><i className="fa-solid fa-note-sticky"></i> Pages</NavLink>
                </div>
                <div className="slider-bar">
                    <NavLink to="/setting" className={({isActive}) => isActive ? "slider-link highlight-slider" : "slider-link"}><i className="fa-solid fa-gear"></i> Settings</NavLink>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar;