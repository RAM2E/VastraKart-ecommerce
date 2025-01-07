import React, { useState, useEffect } from 'react';
import { FaCentos } from 'react-icons/fa';
import { IoIosLogOut, IoMdAddCircleOutline } from "react-icons/io";
import { MdFormatListBulletedAdd, MdAddShoppingCart } from 'react-icons/md';
import { HiMenuAlt2 } from 'react-icons/hi';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({setToken}) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 1024);
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <>
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <HiMenuAlt2 className="menu-icon" />
      </button>

      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)} />

      <aside className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <FaCentos className='side-logo' />
          <h2>VastraKart</h2>
        </div>
        <nav className="sidebar-links">
          <NavLink to='/add' className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <IoMdAddCircleOutline className='sidebar-icon' />
            <span className="sidebar-text">Add Product</span>
          </NavLink>
          <NavLink to='/list' className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <MdFormatListBulletedAdd className='sidebar-icon' />
            <span className="sidebar-text">List Products</span>
          </NavLink>
          <NavLink to='/orders' className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <MdAddShoppingCart className='sidebar-icon' />
            <span className="sidebar-text">Orders</span>
          </NavLink>
          <button onClick={() => setToken("")} className="sidebar-link logout-btn">
            <IoIosLogOut className='sidebar-icon' />
            <span className="sidebar-text">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;