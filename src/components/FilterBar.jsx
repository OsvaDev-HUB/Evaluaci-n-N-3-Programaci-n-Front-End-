function FilterBar({ filterText, onFilterTextChange, filterStatus, onFilterStatusChange, filterPermanent, onFilterPermanentChange }) {
  return (
    <div className="filter-bar-container glass-panel" style={{ flexDirection: 'column', gap: '15px' }}>
      <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
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
      
      <div className="filter-checkbox-wrapper">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#34495e' }}>
          <input 
            type="checkbox" 
            checked={filterPermanent} 
            onChange={(e) => onFilterPermanentChange(e.target.checked)} 
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          Solo mostrar vehículos abonados (permanentes)
        </label>
      </div>
    </div>
  );
}

export default FilterBar;
