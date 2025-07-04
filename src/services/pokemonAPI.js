import api from './api';
import axios from 'axios';

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener lista de Pokémon: ${error.message}`);
  }
};

export const getPokemonDetails = async (pokemonId) => {
  try {
    const response = await api.get(`/pokemon/${pokemonId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener detalles del Pokémon: ${error.message}`);
  }
};

export const getPokemonSpecies = async (speciesId) => {
  try {
    const response = await api.get(`/pokemon-species/${speciesId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener información de la especie: ${error.message}`);
  }
};

export const getEvolutionChain = async (evolutionChainUrl) => {
  try {
    const response = await axios.get(evolutionChainUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener cadena de evolución: ${error.message}`);
  }
};

export const getPokemonType = async (typeId) => {
  try {
    const response = await api.get(`/type/${typeId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener información del tipo: ${error.message}`);
  }
};

export const searchPokemon = async (searchTerm, limit = 1000) => {
  try {
    const response = await api.get(`/pokemon?limit=${limit}`);
    const allPokemon = response.data.results;
    
    const filteredPokemon = allPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return {
      count: filteredPokemon.length,
      results: filteredPokemon
    };
  } catch (error) {
    throw new Error(`Error al buscar Pokémon: ${error.message}`);
  }
};

export const getCompletePokemon = async (pokemonId) => {
  try {
    const pokemonData = await getPokemonDetails(pokemonId);
    
    const speciesData = await getPokemonSpecies(pokemonData.id);
    
    let evolutionData = null;
    if (speciesData.evolution_chain?.url) {
      evolutionData = await getEvolutionChain(speciesData.evolution_chain.url);
    }
    
    return {
      pokemon: pokemonData,
      species: speciesData,
      evolution: evolutionData
    };
  } catch (error) {
    throw new Error(`Error al obtener Pokémon completo: ${error.message}`);
  }
};

export const getMultiplePokemon = async (pokemonList) => {
  try {
    const promises = pokemonList.map(pokemon => {
      if (typeof pokemon === 'string' && pokemon.includes('http')) {
        return axios.get(pokemon);
      } else {
        return getPokemonDetails(pokemon);
      }
    });
    
    const responses = await Promise.all(promises);
    return responses.map(response => 
      response.data || response
    );
  } catch (error) {
    throw new Error(`Error al obtener múltiples Pokémon: ${error.message}`);
  }
};

export const getRandomPokemon = async () => {
  try {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    return await getPokemonDetails(randomId);
  } catch (error) {
    throw new Error(`Error al obtener Pokémon aleatorio: ${error.message}`);
  }
};