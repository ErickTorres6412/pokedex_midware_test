export const ITEMS_PER_PAGE = 20;

const TypeIcon = ({ children, ...props }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    {children}
  </svg>
);

export const POKEMON_TYPES = {
  normal: { 
    color: '#A8A878', 
    textColor: '#333',
    icon: () => (
      <TypeIcon>
        <circle cx="12" cy="12" r="10"/>
      </TypeIcon>
    )
  },
  fire: { 
    color: '#F08030', 
    textColor: '#fff',
    icon: () => (
      <TypeIcon>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5h3V8h4v4h3l-5 5z"/>
      </TypeIcon>
    )
  },
  water: { 
    color: '#6890F0', 
    textColor: '#fff',
    icon: () => (
      <TypeIcon>
        <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2C20 10.48 17.33 6.55 12 2z"/>
      </TypeIcon>
    )
  },
  grass: { 
    color: '#78C850', 
    textColor: '#333',
    icon: () => (
      <TypeIcon>
        <path d="M12 2l3.09 6.26L22 9l-5.91 5.13L17.18 22 12 19.27 6.82 22l1.09-7.87L2 9l6.91-.74L12 2z"/>
      </TypeIcon>
    )
  },
  electric: { 
    color: '#F8D030', 
    textColor: '#333',
    icon: () => (
      <TypeIcon>
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </TypeIcon>
    )
  },
  psychic: { 
    color: '#F85888', 
    textColor: '#fff',
    icon: () => (
      <TypeIcon>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <circle cx="12" cy="12" r="3"/>
      </TypeIcon>
    )
  },
  ice: { 
    color: '#98D8D8', 
    textColor: '#333',
    icon: () => (
      <TypeIcon>
        <path d="M12 2l1.09 3.26L16 4l-1.91 3.26L17 8l-3.26 1.09L12 12l-1.74-2.91L7 8l2.91-1.74L8 4l3.09 1.26L12 2z"/>
      </TypeIcon>
    )
  },
  dragon: { 
    color: '#7038F8', 
    textColor: '#fff',
    icon: () => (
      <TypeIcon>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5h3V8h4v4h3l-5 5z"/>
      </TypeIcon>
    )
  },
  dark: { 
    color: '#705848', 
    textColor: '#fff',
    icon: () => (
      <TypeIcon>
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/>
      </TypeIcon>
    )
  },
  fairy: { 
    color: '#EE99AC', 
    textColor: '#333',
    icon: () => (
      <TypeIcon>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </TypeIcon>
    )
  },
  fighting: { 
    color: '#C03028', 
    textColor: '#fff',
    icon: () => (
      <TypeIcon>
        <path d="M12 2l3.09 6.26L22 9l-5.91 5.13L17.18 22 12 19.27 6.82 22l1.09-7.87L2 9l6.91-.74L12 2z"/>
      </TypeIcon>
    )
  },
  poison: { 
    color: '#A040A0', 
    textColor: '#fff',
    icon: () => (
      <TypeIcon>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5h3V8h4v4h3l-5 5z"/>
      </TypeIcon>
    )
  },
  ground: { 
    color: '#E0C068', 
    textColor: '#333',
    icon: () => (
      <TypeIcon>
        <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h10v2H7z"/>
      </TypeIcon>
    )
  },
  flying: { 
    color: '#A890F0', 
    textColor: '#333',
    icon: () => (
      <TypeIcon>
        <path d="M12 2l3.09 6.26L22 9l-5.91 5.13L17.18 22 12 19.27 6.82 22l1.09-7.87L2 9l6.91-.74L12 2z"/>
      </TypeIcon>
    )
  },
  bug: { 
    color: '#A8B820', 
    textColor: '#333',
    icon: () => (
      <TypeIcon>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5h3V8h4v4h3l-5 5z"/>
      </TypeIcon>
    )
  },
  rock: { 
    color: '#B8A038', 
    textColor: '#fff',
    icon: () => (
      <TypeIcon>
        <path d="M12 2l3.09 6.26L22 9l-5.91 5.13L17.18 22 12 19.27 6.82 22l1.09-7.87L2 9l6.91-.74L12 2z"/>
      </TypeIcon>
    )
  },
  ghost: { 
    color: '#705898', 
    textColor: '#fff',
    icon: () => (
      <TypeIcon>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5h3V8h4v4h3l-5 5z"/>
      </TypeIcon>
    )
  },
  steel: { 
    color: '#B8B8D0', 
    textColor: '#333',
    icon: () => (
      <TypeIcon>
        <path d="M12 2l3.09 6.26L22 9l-5.91 5.13L17.18 22 12 19.27 6.82 22l1.09-7.87L2 9l6.91-.74L12 2z"/>
      </TypeIcon>
    )
  }
};

export const getTypeData = (type) => {
  const typeKey = type?.toLowerCase();
  return POKEMON_TYPES[typeKey] || POKEMON_TYPES.normal;
};

export const getTypeColor = (type) => {
  const typeData = getTypeData(type);
  return {
    color: typeData.color,
    textColor: typeData.textColor
  };
};

export const getTypeIcon = (type) => {
  const typeData = getTypeData(type);
  return typeData.icon();
};