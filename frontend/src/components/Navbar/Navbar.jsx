import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser, BiCart } from 'react-icons/bi';
import './Navbar.css';
import { FaCentos } from 'react-icons/fa';
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { updateSearchTerm,getCartCount,token,setToken } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
  }

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    navigate(path);
  };

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      alert('Please enter a valid search term.');
      return;
    }
    updateSearchTerm(searchInput);
  };

  return (
    <div>
      {loading && (
        <div className="loader-container">
          <div className="loader">
            <FaCentos className="loader-icon" />
          </div>
        </div>
      )}
      <nav className="navbar">
        <div className="nav-top">
          <Link to="/" className='logo-link'>
            <h2>Vk</h2>
          </Link>
          <div className="search-bar">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
              placeholder="Search for products"
            />
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
          </div>
          <div className="icons">
            <div className="profile-group">
              <BiUser className="icon" />
              <div className="dropdown-menu">
                <Link to="/login">
                  <p className="dropdown-item">Login/Sign Up</p>
                </Link>
                <Link to='/orders'>
                <p className="dropdown-item">Orders</p>
                </Link>
                <p onClick={logout} className="dropdown-item">Logout</p>
              </div>
            </div>
            <div className="cart-icon" onClick={() => handleNavigation('/cart')}>
              <BiCart className="icon" />
              <span className="cart-count">{getCartCount()}</span>
            </div>
          </div>
        </div>
        <div className="nav-bottom">
          <div className="nav-container">
            <div onClick={() => handleNavigation('/category/Men')} className="navbar-link">
              Men
            </div>
            <div onClick={() => handleNavigation('/category/Women')} className="navbar-link">
              Women
            </div>
            <div onClick={() => handleNavigation('/category/Kids')} className="navbar-link">
              Kids
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
