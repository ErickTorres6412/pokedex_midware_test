import { formatPokemonName, formatPokemonId, getPokemonSpriteUrl } from '../../../utils/formatters';
import './Sidebar.css';

const Sidebar = ({
  pokemonList = [],
  selectedPokemon,
  onPokemonSelect,
  loading = false,
  isCollapsed = false,
  isOpen = false
}) => {
  const sidebarClasses = `sidebar ${isCollapsed ? 'sidebar--collapsed' : ''} ${isOpen ? 'sidebar--open' : ''}`;

  const handlePokemonClick = (pokemon) => {
    if (onPokemonSelect) {
      onPokemonSelect(pokemon);
    }
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  return (
    <aside className={sidebarClasses}>
      {/* Contenido del sidebar */}
      <div className="sidebar__content">
        {loading ? (
          <div className="sidebar__loading">
            <div className="sidebar__skeleton">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="sidebar__skeleton-item">
                  <div className="sidebar__skeleton-avatar"></div>
                  <div className="sidebar__skeleton-content">
                    <div className="sidebar__skeleton-line"></div>
                    <div className="sidebar__skeleton-line sidebar__skeleton-line--short"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ul className="sidebar__list">
            {pokemonList.map((pokemon, index) => {
              const isSelected = selectedPokemon?.id === pokemon.id;
              const itemClasses = `sidebar__item ${isSelected ? 'sidebar__item--selected' : ''}`;

              return (
                <li 
                  key={pokemon.id} 
                  className={itemClasses}
                  style={{ '--index': index }}
                >
                  <button
                    className="sidebar__button"
                    onClick={() => handlePokemonClick(pokemon)}
                    aria-label={`Seleccionar ${formatPokemonName(pokemon.name)}`}
                  >
                    {/* Avatar del Pokémon */}
                    <div className="sidebar__avatar">
                      <img
                        src={getPokemonSpriteUrl(pokemon.id)}
                        alt={formatPokemonName(pokemon.name)}
                        className="sidebar__avatar-image"
                        onError={handleImageError}
                        loading="lazy"
                      />
                      <div className="sidebar__avatar-placeholder">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <circle cx="12" cy="12" r="8"/>
                        </svg>
                      </div>
                    </div>

                    {/* Información del Pokémon */}
                    <div className="sidebar__info">
                      <div className="sidebar__name">
                        {formatPokemonName(pokemon.name)}
                      </div>
                    </div>

                    {/* ID en la esquina superior derecha */}
                    <div className="sidebar__id-corner">
                      {formatPokemonId(pokemon.id)}
                    </div>
                    
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* Estado vacío */}
        {!loading && pokemonList.length === 0 && (
          <div className="sidebar__empty">
            <div className="sidebar__empty-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <p className="sidebar__empty-title">No hay Pokémon</p>
            <p className="sidebar__empty-description">
              No se encontraron Pokémon que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>

      {/* Footer del sidebar */}
      <div className="sidebar__footer">
        <p className="sidebar__footer-text">
          Total: {pokemonList.length} Pokémon
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;