import './Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  hasPrevPage,
  hasNextPage,
  loading = false,
  className = ''
}) => {
  return (
    <section className={`pagination-section ${className}`}>
      <div className="pagination">
        <button
          className="pagination__button"
          onClick={onPrevPage}
          disabled={!hasPrevPage || loading}
          aria-label="Página anterior"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
          Anterior
        </button>

        <span className="pagination__info">
          Página {currentPage + 1} de {totalPages}
        </span>

        <button
          className="pagination__button"
          onClick={onNextPage}
          disabled={!hasNextPage || loading}
          aria-label="Página siguiente"
        >
          Siguiente
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Pagination;