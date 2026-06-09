function FilterBar({ filterText, onFilterTextChange, filterStatus, onFilterStatusChange }) {
  return (
    <div className="filter-bar-container glass-panel">
      <div className="filter-input-wrapper">
        <input
          type="text"
          placeholder="Buscar por patente..."
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
          className="form-input"
        />
      </div>
      
      <div className="filter-input-wrapper" style={{ flex: '0 1 200px' }}>
        <select
          value={filterStatus}
          onChange={(e) => onFilterStatusChange(e.target.value)}
          className="form-input"
          style={{ width: '100%', cursor: 'pointer' }}
        >
          <option value="todos">Todos los estados</option>
          <option value="estacionado">Estacionados</option>
          <option value="retirado">Retirados</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
