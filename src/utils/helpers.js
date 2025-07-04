import { POKEMON_TYPES } from './constants';

export const getTypeColor = (type) => {
  const normalizedType = type?.toLowerCase();
  return POKEMON_TYPES[normalizedType] || POKEMON_TYPES.normal;
};

export const isElementInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const generatePaginationArray = (currentPage, totalPages, delta = 2) => {
  const range = [];
  const rangeWithDots = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    rangeWithDots.push(1, '...');
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push('...', totalPages);
  } else {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots;
};

export const sortPokemon = (pokemon, sortBy = 'id', order = 'asc') => {
  const sortedPokemon = [...pokemon].sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
      case 'name':
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case 'id':
        valueA = a.id;
        valueB = b.id;
        break;
      case 'height':
        valueA = a.height;
        valueB = b.height;
        break;
      case 'weight':
        valueA = a.weight;
        valueB = b.weight;
        break;
      default:
        valueA = a.id;
        valueB = b.id;
    }

    if (order === 'desc') {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    } else {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }
  });

  return sortedPokemon;
};

export const filterPokemonByType = (pokemon, type) => {
  if (!type || type === 'all') return pokemon;
  
  return pokemon.filter(p => 
    p.types && p.types.some(t => 
      t.type?.name?.toLowerCase() === type.toLowerCase()
    )
  );
};

export const searchPokemon = (pokemon, query) => {
  if (!query) return pokemon;
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return pokemon.filter(p => {
    const name = p.name?.toLowerCase() || '';
    const id = p.id?.toString() || '';
    
    return name.includes(normalizedQuery) || id.includes(normalizedQuery);
  });
};

export const getPokemonDominantColor = (pokemon) => {
  if (!pokemon?.types?.length) return POKEMON_TYPES.normal.color;
  
  const firstType = pokemon.types[0].type.name;
  return getTypeColor(firstType).color;
};

export const calculateStatTotal = (stats) => {
  if (!stats || !Array.isArray(stats)) return 0;
  
  return stats.reduce((total, stat) => total + (stat.base_stat || 0), 0);
};

export const formatStatName = (statName) => {
  const statMap = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    'speed': 'Speed'
  };
  
  return statMap[statName] || statName;
};

export const getPokemonSprite = (pokemon) => {
  if (!pokemon) return '';
  
  if (pokemon.sprites?.other?.['official-artwork']?.front_default) {
    return pokemon.sprites.other['official-artwork'].front_default;
  }
  
  if (pokemon.sprites?.other?.dream_world?.front_default) {
    return pokemon.sprites.other.dream_world.front_default;
  }
  
  if (pokemon.sprites?.front_default) {
    return pokemon.sprites.front_default;
  }
  
  if (pokemon.id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }
  
  return '';
};

export const isValidPokemon = (pokemon) => {
  return pokemon && 
         typeof pokemon === 'object' && 
         pokemon.id && 
         pokemon.name && 
         Array.isArray(pokemon.types);
};

export const createSlug = (name) => {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const slugToName = (slug) => {
  if (!slug) return '';
  
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase());
};

export const isMobile = () => {
  return window.innerWidth < 768;
};

export const isTablet = () => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = () => {
  return window.innerWidth >= 1024;
};

export const handleImageError = (event, fallbackSrc = '') => {
  if (fallbackSrc && event.target.src !== fallbackSrc) {
    event.target.src = fallbackSrc;
  } else {
    event.target.style.display = 'none';
  }
};