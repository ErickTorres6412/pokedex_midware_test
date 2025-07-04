import { useState, useEffect } from 'react';
import { getPokemonDetails, getCompletePokemon } from '../services/pokemonAPI';

export const usePokemon = (pokemonId, includeComplete = false) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async (id) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = includeComplete 
        ? await getCompletePokemon(id)
        : await getPokemonDetails(id);
      
      setPokemon(data);

      console.log('Fetched Pokemon:', data);
    } catch (err) {
      setError(err.message);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(pokemonId);
  }, [pokemonId, includeComplete]);

  const refetch = () => fetchPokemon(pokemonId);

  return {
    pokemon,
    loading,
    error,
    refetch
  };
};