import { useState, useEffect } from 'react';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterPermanent, setFilterPermanent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const CUPOS_TOTALES = 10;
  const vehiculosEstacionados = vehicles.filter(v => v.estado === 'estacionado').length;
  const cuposDisponibles = CUPOS_TOTALES - vehiculosEstacionados;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const storedVehicles = localStorage.getItem('parkedVehicles');

        if (storedVehicles) {
          setVehicles(JSON.parse(storedVehicles));
          setIsLoading(false);
        } else {
          const response = await fetch('/data.json');
          if (!response.ok) throw new Error('Error al cargar datos');
          const data = await response.json();
          setVehicles(data);
          localStorage.setItem('parkedVehicles', JSON.stringify(data));
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error cargando los datos iniciales:", error);
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('parkedVehicles', JSON.stringify(vehicles));
    }
  }, [vehicles, isLoading]);

  const handleAddVehicle = (newVehicleData) => {
    if (cuposDisponibles <= 0) {
      alert("No hay cupos disponibles en el estacionamiento.");
      return;
    }

    const newVehicle = {
      ...newVehicleData,
      id: Date.now().toString(),
    };
    setVehicles(prev => [...prev, newVehicle]);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setVehicles(prev =>
      prev.map(vehicle =>
        vehicle.id === id ? { ...vehicle, estado: newStatus } : vehicle
      )
    );
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesText = vehicle.patente.toLowerCase().includes(filterText.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || vehicle.estado === filterStatus;
    const matchesPermanent = !filterPermanent || vehicle.permanente;
    return matchesText && matchesStatus && matchesPermanent;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Gestión de Estacionamientos</h1>
        <div style={{ marginTop: '10px', fontSize: '1.2em', fontWeight: 'bold', color: cuposDisponibles > 0 ? '#0ea5e9' : '#ef4444' }}>
          Cupos Disponibles: {cuposDisponibles} / {CUPOS_TOTALES}
        </div>
      </header>

      {isLoading ? (
        <div className="loading-state">Cargando sistema...</div>
      ) : (
        <main className="main-content">
          <aside className="sidebar">
            <VehicleForm onAddVehicle={handleAddVehicle} />
          </aside>

          <section className="content">
            <FilterBar
              filterText={filterText}
              onFilterTextChange={setFilterText}
              filterStatus={filterStatus}
              onFilterStatusChange={setFilterStatus}
              filterPermanent={filterPermanent}
              onFilterPermanentChange={setFilterPermanent}
            />

            <VehicleList
              vehicles={filteredVehicles}
              onUpdateStatus={handleUpdateStatus}
            />
          </section>
        </main>
      )}

      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '20px', borderTop: '1px solid #e2e8f0', color: '#64748b' }}>
        <p>Evaluación 3 - Programación Front End | Sistema de Gestión de Estacionamientos</p>
      </footer>
    </div>
  );
}

export default App;
