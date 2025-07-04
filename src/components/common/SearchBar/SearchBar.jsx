import React, { useState, useRef, useEffect } from 'react';
import { debounce } from '../../../utils/helpers';
import './SearchBar.css';

const SearchBar = ({
  value = '',
  onChange,
  placeholder = 'Buscar Pokémon...',
  autoFocus = false,
  debounceDelay = 300,
  onClear
}) => {
  const [searchValue, setSearchValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Debounced onChange
  const debouncedOnChange = useRef(
    debounce((newValue) => {
      if (onChange) {
        onChange(newValue);
      }
    }, debounceDelay)
  ).current;

  // Efecto para sincronizar valor externo
  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Manejar cambio de input
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    debouncedOnChange(newValue);
  };

  // Manejar limpiar búsqueda
  const handleClear = () => {
    setSearchValue('');
    if (onChange) {
      onChange('');
    }
    if (onClear) {
      onClear();
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Manejar focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Manejar blur
  const handleBlur = () => {
    setIsFocused(false);
  };

  // Manejar teclas especiales
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  const searchBarClasses = `search-bar ${isFocused ? 'search-bar--focused' : ''}`;

  return (
    <div className={searchBarClasses}>
      <div className="search-bar__container">
        {/* Icono de búsqueda */}
        <div className="search-bar__icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="m21 21-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Input de búsqueda */}
        <input
          ref={inputRef}
          type="text"
          className="search-bar__input"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck="false"
        />

        {/* Botón de limpiar */}
        {searchValue && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Indicador de búsqueda activa */}
      {searchValue && (
        <div className="search-bar__indicator">
          <span className="search-bar__indicator-text">
            Buscando "{searchValue}"
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;