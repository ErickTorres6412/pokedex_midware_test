import PokemonCard from '../PokemonCard/PokemonCard';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import './PokemonInfo.css';

const PokemonInfo = ({ pokemon, loading = false }) => {
  if (loading) {
    return (
      <div className="pokemon-info pokemon-info--loading">
        <div className="pokemon-info__skeleton">
          <PokemonCard loading={true} />
          <PokemonDetails loading={true} />
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="pokemon-info pokemon-info--empty">
        <div className="pokemon-info__empty-content">
          <div className="pokemon-info__empty-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <h3 className="pokemon-info__empty-title">Selecciona un Pokémon</h3>
          <p className="pokemon-info__empty-description">
            Elige un Pokémon de la lista para ver su información detallada
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-info">
      <div className="pokemon-info__left">
        <PokemonCard pokemon={pokemon} loading={loading} />
      </div>

      <div className="pokemon-info__right">
        <PokemonDetails pokemon={pokemon} loading={loading} />
      </div>
    </div>
  );
};

export default PokemonInfo;