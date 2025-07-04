import './Loader.css';

const Loader = ({ 
  size = 'md', 
  color = 'primary', 
  message = 'Cargando...', 
  overlay = false 
}) => {
  const loaderClasses = `loader loader--${size} loader--${color}`;
  
  if (overlay) {
    return (
      <div className="loader-overlay">
        <div className="loader-container">
          <div className={loaderClasses}>
            <div className="loader__spinner">
              <div className="loader__pokeball">
                <div className="loader__pokeball-top"></div>
                <div className="loader__pokeball-bottom"></div>
                <div className="loader__pokeball-center"></div>
              </div>
            </div>
          </div>
          {message && <p className="loader__message">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className={loaderClasses}>
        <div className="loader__spinner">
          <div className="loader__pokeball">
            <div className="loader__pokeball-top"></div>
            <div className="loader__pokeball-bottom"></div>
            <div className="loader__pokeball-center"></div>
          </div>
        </div>
      </div>
      {message && <p className="loader__message">{message}</p>}
    </div>
  );
};

export default Loader;