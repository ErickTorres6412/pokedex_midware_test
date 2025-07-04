import { formatWeight, formatHeight, formatAbilities } from '../../../utils/formatters';
import './PokemonDetails.css';

const PokemonDetails = ({ pokemon, loading = false }) => {
  const getPokemonGenus = (speciesData) => {
    if (!speciesData || !speciesData.genera) {
      return 'Unknown';
    }

    const englishGenus = speciesData.genera.find(
      genus => genus.language.name === 'en'
    );

    if (englishGenus) {
      return englishGenus.genus.replace(/\s*Pokémon$/i, '');
    }

    const spanishGenus = speciesData.genera.find(
      genus => genus.language.name === 'es'
    );

    if (spanishGenus) {
      return spanishGenus.genus.replace(/\s*Pokémon$/i, '');
    }

    const firstGenus = speciesData.genera[0]?.genus || 'Unknown';
    return firstGenus.replace(/\s*Pokémon$/i, '');
  };

  const getPokemonEggGroups = (speciesData) => {
    if (!speciesData || !speciesData.egg_groups) {
      return 'Unknown';
    }

    return speciesData.egg_groups
      .map(group => group.name.charAt(0).toUpperCase() + group.name.slice(1))
      .join(' and ');
  };

  if (loading) {
    return (
      <div className="pokemon-details pokemon-details--loading">
        <div className="pokemon-details__skeleton-line pokemon-details__skeleton-line--subtitle"></div>
        <div className="pokemon-details__skeleton-stats">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="pokemon-details__skeleton-stat">
              <div className="pokemon-details__skeleton-line pokemon-details__skeleton-line--short"></div>
              <div className="pokemon-details__skeleton-line"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  const pokemonData = pokemon.pokemon || pokemon;
  const speciesData = pokemon.species || null;

  return (
    <div className="pokemon-details">
      <h2 className="pokemon-details__section-title">Information</h2>

      <div className="pokemon-details__stats-grid">
        <div className="pokemon-details__stat">
          <span className="pokemon-details__stat-label">Weight</span>
          <span className="pokemon-details__stat-value">
            {pokemonData.weight ? formatWeight(pokemonData.weight) : '15.2 lbs'}
          </span>
        </div>

        <div className="pokemon-details__stat">
          <span className="pokemon-details__stat-label">Height</span>
          <span className="pokemon-details__stat-value">
            {pokemonData.height ? formatHeight(pokemonData.height) : "2'04\""}
          </span>
        </div>

        <div className="pokemon-details__stat">
          <span className="pokemon-details__stat-label">Species</span>
          <span className="pokemon-details__stat-value">
            {speciesData ? getPokemonGenus(speciesData) : 'Unknown'}
          </span>
        </div>

        <div className="pokemon-details__stat">
          <span className="pokemon-details__stat-label">Egg Groups</span>
          <span className="pokemon-details__stat-value">
            {speciesData ? getPokemonEggGroups(speciesData) : 'Unknown'}
          </span>
        </div>

        <div className="pokemon-details__stat">
          <span className="pokemon-details__stat-label">Abilities</span>
          <span className="pokemon-details__stat-value">
            {pokemonData.abilities && pokemonData.abilities.length > 0
              ? formatAbilities(pokemonData.abilities)
              : 'Unknown'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;