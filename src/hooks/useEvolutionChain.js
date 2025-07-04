import { useState, useEffect } from 'react';
import { getEvolutionChain, getPokemonSpecies } from '../services/pokemonAPI';

export const useEvolutionChain = (pokemonId) => {
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (!pokemonId) return;

      setLoading(true);
      setError(null);

      try {
        const speciesData = await getPokemonSpecies(pokemonId);
        
        if (speciesData.evolution_chain?.url) {
          const evolutionData = await getEvolutionChain(speciesData.evolution_chain.url);
          
          const processedChain = processEvolutionChain(evolutionData.chain);
          setEvolutionChain(processedChain);
        } else {
          setEvolutionChain([]);
        }
      } catch (err) {
        setError(err.message);
        setEvolutionChain(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [pokemonId]);

  return {
    evolutionChain,
    loading,
    error
  };
};

const processEvolutionChain = (chain) => {
  const evolutionArray = [];
  
  const processNode = (node) => {
    const urlParts = node.species.url.split('/');
    const speciesId = urlParts[urlParts.length - 2];
    
    evolutionArray.push({
      id: parseInt(speciesId),
      name: node.species.name,
      evolutionDetails: node.evolution_details
    });
    
    if (node.evolves_to && node.evolves_to.length > 0) {
      node.evolves_to.forEach(evolution => {
        processNode(evolution);
      });
    }
  };
  
  processNode(chain);
  return evolutionArray;
};