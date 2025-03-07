
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleMenuToggle();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
         
          <div className="navbar-logo">
            <a to="/" aria-label="Home">
              Hotel Booking
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <a href="/">About</a>
            <a href="/services">Services</a>
            <a href="/contact">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-button">
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={handleMenuToggle}
              onKeyDown={handleKeyDown}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>


        <div
          className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
          id="mobile-menu"
        >
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;