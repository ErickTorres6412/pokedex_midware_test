import { useState, useEffect } from 'react';
import { usePokemonList } from './usePokemonList';
import { usePokemon } from './usePokemon';
import { useEvolutionChain } from './useEvolutionChain';

export const useMainLayout = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const {
    pokemonList,
    loading: listLoading,
    error: listError,
    search,
    searchTerm,
    clearSearch,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    currentPage,
    totalPages
  } = usePokemonList();

  const {
    pokemon: detailedPokemon,
    loading: pokemonLoading,
    error: pokemonError
  } = usePokemon(selectedPokemon?.id, true);

  const {
    evolutionChain,
    loading: evolutionLoading,
    error: evolutionError
  } = useEvolutionChain(selectedPokemon?.id);

  useEffect(() => {
    if (pokemonList.length > 0 && !selectedPokemon) {
      setSelectedPokemon(pokemonList[0]);
    }
  }, [pokemonList, selectedPokemon]);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
    if (window.innerWidth <= 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleSearch = (searchValue) => {
    search(searchValue);
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleEvolutionPokemonClick = (evolutionPokemon) => {
    const foundPokemon = pokemonList.find(p => p.id === evolutionPokemon.id);
    if (foundPokemon) {
      handlePokemonSelect(foundPokemon);
    } else {
      const basicPokemon = {
        id: evolutionPokemon.id,
        name: evolutionPokemon.name,
        url: `https://pokeapi.co/api/v2/pokemon/${evolutionPokemon.id}/`
      };
      handlePokemonSelect(basicPokemon);
    }
  };

  const handleOverlayClick = () => {
    setIsMobileSidebarOpen(false);
  };

  const pokemonData = detailedPokemon || null;
  const hasAnyError = listError || pokemonError || evolutionError;
  const shouldShowLoader = listLoading && pokemonList.length === 0;
  const shouldShowPagination = !searchTerm;

  return {
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
  };
};