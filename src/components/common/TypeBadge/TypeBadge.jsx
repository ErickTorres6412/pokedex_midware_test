import { getTypeColor, getTypeIcon } from '../../../utils/constants';
import { formatType } from '../../../utils/formatters';
import './TypeBadge.css';

const TypeBadge = ({ 
  type, 
  size = 'md', 
  clickable = false, 
  onClick, 
  outlined = false 
}) => {
  if (!type) return null;

  const typeColors = getTypeColor(type);
  const formattedType = formatType(type);
  
  const badgeClasses = [
    'type-badge',
    `type-badge--${size}`,
    `type-badge--${type.toLowerCase()}`,
    outlined && 'type-badge--outlined',
    clickable && 'type-badge--clickable'
  ].filter(Boolean).join(' ');

  const badgeStyles = {
    '--type-color': typeColors.color,
    '--type-text-color': typeColors.textColor
  };

  const handleClick = () => {
    if (clickable && onClick) {
      onClick(type);
    }
  };

  const handleKeyDown = (e) => {
    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  const BadgeComponent = clickable ? 'button' : 'span';

  return (
    <BadgeComponent
      className={badgeClasses}
      style={badgeStyles}
      onClick={clickable ? handleClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
      aria-label={clickable ? `Filtrar por tipo ${formattedType}` : undefined}
    >
      <span className="type-badge__icon">
        {getTypeIcon(type)}
      </span>
      <span className="type-badge__text">{formattedType}</span>
    </BadgeComponent>
  );
};

export default TypeBadge;