import { useState } from 'react';
import TypeBadge from '../../common/TypeBadge/TypeBadge';
import { formatPokemonName, getPokemonImageUrl } from '../../../utils/formatters';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, loading = false }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = (e) => {
    console.log('Error loading image:', e.target.src);
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  if (loading) {
    return (
      <div className="pokemon-card pokemon-card--loading">
        <div className="pokemon-card__skeleton-image"></div>
        <div className="pokemon-card__skeleton-content">
          <div className="pokemon-card__skeleton-line pokemon-card__skeleton-line--title"></div>
          <div className="pokemon-card__skeleton-types">
            <div className="pokemon-card__skeleton-type"></div>
            <div className="pokemon-card__skeleton-type"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  const pokemonData = pokemon.pokemon || pokemon;

  return (
    <div className="pokemon-card">
      <div className="pokemon-card__image-container">
        {!imageError && (
          <img
            src={getPokemonImageUrl(pokemonData.id)}
            alt={formatPokemonName(pokemonData.name)}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
            className="pokemon-card__image"
          />
        )}
        {imageError && (
          <div className="pokemon-card__image-placeholder">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
        )}
      </div>

      <div className="pokemon-card__main">
        <div className="pokemon-card__header">
          <h1 className="pokemon-card__name">
            {formatPokemonName(pokemonData.name)}
          </h1>
        </div>

        <div className="pokemon-card__types">
          {pokemonData.types && pokemonData.types.map((typeInfo, index) => (
            <TypeBadge
              key={index}
              type={typeInfo.type.name}
              size="lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;