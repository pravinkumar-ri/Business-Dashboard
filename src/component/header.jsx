import React, { useState } from "react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
        setMenuOpen(!menuOpen);
    };

    return(
        <div className="header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>RI MAX</h1>
                <button 
                    onClick={toggleMenu} 
                    className="menu-toggle"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '24px',
                        cursor: 'pointer',
                        display: 'none'
                    }}
                >
                    ☰
                </button>
            </div>
        </div>
    )
}

export default Header;