import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import PokemonInfo from '../../pokemon/PokemonInfo/PokemonInfo';
import EvolutionChart from '../../pokemon/EvolutionChart/EvolutionChart';
import Pagination from '../../common/Pagination/Pagination';
import Loader from '../../common/Loader/Loader';
import { useMainLayout } from '../../../hooks/useMainLayout';
import './MainLayout.css';

const MainLayout = () => {
  const {
    selectedPokemon,
    isMobileSidebarOpen,
    pokemonData,
    
    pokemonList,
    searchTerm,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    
    listLoading,
    pokemonLoading,
    evolutionLoading,
    
    listError,
    pokemonError,
    evolutionError,
    hasAnyError,
    
    evolutionChain,
    
    shouldShowLoader,
    shouldShowPagination,
    
    handlePokemonSelect,
    handleSearch,
    handleClearSearch,
    handleToggleMobileSidebar,
    handleEvolutionPokemonClick,
    handleOverlayClick,
    
    nextPage,
    prevPage
  } = useMainLayout();

  return (
    <div className="main-layout">
      <div className="main-layout__container-wrapper">
        <Sidebar
          pokemonList={pokemonList}
          selectedPokemon={selectedPokemon}
          onPokemonSelect={handlePokemonSelect}
          loading={listLoading}
          isOpen={isMobileSidebarOpen}
        />

        {isMobileSidebarOpen && (
          <div 
            className="main-layout__overlay"
            onClick={handleOverlayClick}
          />
        )}

        <main className="main-layout__content">
          <div className="main-layout__container">
            <div className="main-layout__header-section">
              <Header
                searchValue={searchTerm}
                onSearch={handleSearch}
                onClearSearch={handleClearSearch}
              />
            </div>

            <section className="main-layout__pokemon-section">
              <PokemonInfo
                pokemon={pokemonData}
                loading={pokemonLoading}
              />
            </section>

            <section className="main-layout__evolution-section">
              <EvolutionChart
                evolutionChain={evolutionChain}
                onPokemonClick={handleEvolutionPokemonClick}
                loading={evolutionLoading}
                currentPokemon={selectedPokemon}
              />
            </section>

            {shouldShowPagination && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={prevPage}
                onNextPage={nextPage}
                hasPrevPage={hasPrevPage}
                hasNextPage={hasNextPage}
                loading={listLoading}
                className="main-layout__pagination-section"
              />
            )}

            {hasAnyError && (
              <section className="main-layout__error-section">
                <div className="main-layout__error">
                  <div className="main-layout__error-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  </div>
                  <h3 className="main-layout__error-title">
                    Ha ocurrido un error
                  </h3>
                  <p className="main-layout__error-message">
                    {listError || pokemonError || evolutionError}
                  </p>
                </div>
              </section>
            )}
          </div>

          <button 
            className="main-layout__mobile-menu"
            onClick={handleToggleMobileSidebar}
            aria-label="Abrir menú"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </main>
      </div>

      {shouldShowLoader && (
        <Loader 
          overlay={true} 
          message="Cargando Pokémon..." 
          size="lg"
        />
      )}
    </div>
  );
};

export default MainLayout;