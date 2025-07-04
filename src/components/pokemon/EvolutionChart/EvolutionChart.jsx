import React from 'react';
import { formatPokemonName, getPokemonImageUrl } from '../../../utils/formatters';
import './EvolutionChart.css';

const EvolutionChart = ({ 
  evolutionChain = [], 
  onPokemonClick, 
  loading = false,
  currentPokemon 
}) => {
  if (loading) {
    return (
      <div className="evolution-chart">
        <h2 className="evolution-chart__title">Evolution Chart</h2>
        <div className="evolution-chart__loading">
          <div className="evolution-chart__skeleton">
            {Array.from({ length: 3 }).map((_, index) => (
              <React.Fragment key={index}>
                <div className="evolution-chart__skeleton-item">
                  <div className="evolution-chart__skeleton-image"></div>
                  <div className="evolution-chart__skeleton-name"></div>
                </div>
                {index < 2 && (
                  <div className="evolution-chart__skeleton-arrow"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!evolutionChain || evolutionChain.length === 0) {
    return (
      <div className="evolution-chart">
        <h2 className="evolution-chart__title">Evolution Chart</h2>
        <div className="evolution-chart__empty">
          <div className="evolution-chart__empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            </svg>
          </div>
          <p className="evolution-chart__empty-text">
            No hay información de evolución disponible
          </p>
        </div>
      </div>
    );
  }

  const handlePokemonClick = (pokemon) => {
    if (onPokemonClick) {
      onPokemonClick(pokemon);
    }
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  return (
    <div className="evolution-chart">
      <h2 className="evolution-chart__title">Evolution Chart</h2>
      
      <div className="evolution-chart__container">
        <div className="evolution-chart__chain">
          {evolutionChain.map((pokemon, index) => {
            const isCurrentPokemon = currentPokemon?.id === pokemon.id;
            const pokemonClasses = `evolution-chart__pokemon ${
              isCurrentPokemon ? 'evolution-chart__pokemon--current' : ''
            }`;

            return (
              <React.Fragment key={pokemon.id}>
                <div className={pokemonClasses}>
                  <button
                    className="evolution-chart__pokemon-button"
                    onClick={() => handlePokemonClick(pokemon)}
                    aria-label={`Ver detalles de ${formatPokemonName(pokemon.name)}`}
                  >
                    <div className="evolution-chart__pokemon-image">
                      <img
                        src={getPokemonImageUrl(pokemon.id)}
                        alt={formatPokemonName(pokemon.name)}
                        onError={handleImageError}
                        loading="lazy"
                      />
                      <div className="evolution-chart__pokemon-placeholder">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                        </svg>
                      </div>
                    </div>
                    
                    <div className="evolution-chart__pokemon-name">
                      {formatPokemonName(pokemon.name)}
                    </div>
                  </button>
                </div>

                {index < evolutionChain.length - 1 && (
                  <div className="evolution-chart__arrow">
                    <svg
                      width="40"
                      height="24"
                      viewBox="0 0 40 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12H38M38 12L28 2M38 12L28 22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {evolutionChain.length > 1 && (
          <div className="evolution-chart__info">
            <p className="evolution-chart__info-text">
              {evolutionChain.length} etapas de evolución
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvolutionChart;