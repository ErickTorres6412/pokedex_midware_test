import React, { useState, useRef, useEffect } from 'react';
import SearchBar from '../../common/SearchBar/SearchBar';
import './Header.css';

const Header = ({
  searchValue = '',
  onSearch,
  onClearSearch
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 300); 
    }
  }, [isSearchOpen]);

  const shouldShowExpanded = isSearchOpen || searchValue;

  return (
    <div className="header">
      <div className="header__container" ref={searchContainerRef}>
        {!shouldShowExpanded ? (
          <button 
            className="header__search-button"
            onClick={handleSearchToggle}
            aria-label="Buscar Pokémon"
          >
            <svg 
              width="30" 
              height="30" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        ) : (
          <div className={`header__search-container ${shouldShowExpanded ? 'header__search-container--open' : ''}`}>
            <SearchBar
              ref={searchInputRef}
              value={searchValue}
              onChange={onSearch}
              onClear={onClearSearch}
              placeholder="Buscar Pokémon..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;