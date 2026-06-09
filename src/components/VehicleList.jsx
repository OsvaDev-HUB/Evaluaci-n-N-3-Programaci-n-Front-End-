import VehicleCard from './VehicleCard';

function VehicleList({ vehicles, onUpdateStatus }) {
  if (vehicles.length === 0) {
    return (
      <div className="empty-state">
        <h3>No hay vehículos registrados</h3>
        <p>Los vehículos que coincidan con la búsqueda aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="vehicle-list-wrapper">
      <div className="vehicle-grid">
        {vehicles.map((vehicle) => (
          <VehicleCard 
            key={vehicle.id} 
            vehicle={vehicle} 
            onUpdateStatus={onUpdateStatus} 
          />
        ))}
      </div>
    </div>
  );
}

export default VehicleList;
