export const formatPokemonName = (name) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const formatPokemonId = (id) => {
  if (!id) return '';
  return `#${id.toString().padStart(3, '0')}`;
};

export const formatWeight = (weight) => {
  if (!weight) return '0 lbs.';
  const pounds = (weight * 0.220462).toFixed(1);
  return `${pounds} lbs.`;
};

export const formatHeight = (height) => {
  if (!height) return '0\'00"';
  const totalInches = height * 3.93701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches.toString().padStart(2, '0')}"`;
};

export const formatType = (type) => {
  if (!type) return '';
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
};

export const formatAbilities = (abilities) => {
  if (!abilities || abilities.length === 0) return '';
  
  return abilities
    .map(ability => {
      const name = ability.ability?.name || ability.name || '';
      return formatPokemonName(name.replace('-', ' '));
    })
    .join(', ');
};

export const formatEggGroups = (eggGroups) => {
  if (!eggGroups || eggGroups.length === 0) return '';
  
  return eggGroups
    .map(group => {
      const name = group.name || group;
      return formatPokemonName(name.replace('-', ' '));
    })
    .join(' and ');
};

export const formatSpecies = (species) => {
  if (!species) return '';
  return formatPokemonName(species.replace('-', ' '));
};

export const getPokemonImageUrl = (id) => {
  if (!id) return '';
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const getPokemonSpriteUrl = (id) => {
  if (!id) return '';
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export const formatNumber = (num) => {
  if (!num) return '0';
  return num.toLocaleString();
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const extractIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split('/');
  const id = parts[parts.length - 2];
  return parseInt(id, 10);
};