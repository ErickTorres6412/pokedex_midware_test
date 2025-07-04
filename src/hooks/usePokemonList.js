import { useState, useEffect, useCallback } from 'react';
import { getPokemonList, getMultiplePokemon, searchPokemon } from '../services/pokemonAPI';
import { ITEMS_PER_PAGE } from '../utils/constants';

export const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchPokemonList = useCallback(async (page = 0, search = '') => {
    setLoading(true);
    setError(null);

    try {
      let data;
      
      if (search.trim()) {
        data = await searchPokemon(search.trim());
        setTotalCount(data.count);
        setHasNextPage(false); 
      } else {
        const offset = page * ITEMS_PER_PAGE;
        data = await getPokemonList(ITEMS_PER_PAGE, offset);
        setTotalCount(data.count);
        setHasNextPage(data.next !== null);
      }

      const pokemonUrls = data.results.map(pokemon => pokemon.url);
      const detailedPokemon = await getMultiplePokemon(pokemonUrls);
      
      setPokemonList(detailedPokemon);
    } catch (err) {
      setError(err.message);
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemonList(0, searchTerm);
  }, [fetchPokemonList, searchTerm]);

  const goToPage = (page) => {
    if (page !== currentPage && !loading) {
      setCurrentPage(page);
      fetchPokemonList(page, searchTerm);
    }
  };

  const nextPage = () => {
    if (hasNextPage && !loading) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchPokemonList(newPage, searchTerm);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !loading) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      fetchPokemonList(newPage, searchTerm);
    }
  };

  const search = (term) => {
    setSearchTerm(term);
    setCurrentPage(0);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(0);
  };

  const refetch = () => {
    fetchPokemonList(currentPage, searchTerm);
  };

  return {
    pokemonList,
    loading,
    error,
    currentPage,
    totalCount,
    searchTerm,
    hasNextPage,
    // Funciones
    goToPage,
    nextPage,
    prevPage,
    search,
    clearSearch,
    refetch,
    // Datos calculados
    totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
    hasPrevPage: currentPage > 0,
  };
};