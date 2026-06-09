function VehicleList({ vehicles, onUpdateStatus }) {
  if (vehicles.length === 0) {
    return (
      <div className="empty-state glass-panel">
        <h3>No hay vehículos registrados</h3>
        <p>Los vehículos que coincidan con la búsqueda aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="vehicle-list-wrapper">
      <div className="vehicle-grid">
        {vehicles.map((vehicle) => (
          <div 
            key={vehicle.id} 
            className={`vehicle-card glass-panel status-${vehicle.estado}`}
          >
            <div className="vehicle-header">
              <span className="vehicle-plate">{vehicle.patente}</span>
              <span className={`vehicle-status status-badge-${vehicle.estado}`}>
                {vehicle.estado}
              </span>
            </div>
            
            <div className="vehicle-details">
              <div className="detail-row">
                <span className="detail-label">Marca/Modelo:</span>
                <span className="detail-value">{vehicle.marca} {vehicle.modelo}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Cliente:</span>
                <span className="detail-value">{vehicle.cliente}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Hora Entrada:</span>
                <span className="detail-value">{vehicle.horaEntrada}</span>
              </div>
            </div>

            {vehicle.estado === 'estacionado' && (
              <div className="vehicle-actions">
                <button 
                  className="danger" 
                  onClick={() => onUpdateStatus(vehicle.id, 'retirado')}
                >
                  Marcar Retirado
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleList;
