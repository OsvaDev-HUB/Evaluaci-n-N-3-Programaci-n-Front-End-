import React from 'react';

function VehicleCard({ vehicle, onUpdateStatus }) {
  return (
    <div 
      className={`vehicle-card status-${vehicle.estado} ${vehicle.permanente ? 'is-permanente' : ''}`}
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
  );
}

export default VehicleCard;
