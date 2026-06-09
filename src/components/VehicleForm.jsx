import { useState } from 'react';

function VehicleForm({ onAddVehicle }) {
  const [formData, setFormData] = useState({
    patente: '',
    marca: '',
    modelo: '',
    horaEntrada: '',
    cliente: '',
    permanente: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.patente || !formData.marca || !formData.modelo || !formData.horaEntrada || !formData.cliente) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const patenteRegex = /^[A-Za-z]{4}\d{2}$/;
    if (!patenteRegex.test(formData.patente.replace("-", ""))) {
      setError('La patente debe tener 4 letras y 2 números (Ej: ABCD12 o ABCD-12).');
      return;
    }

    onAddVehicle({
      ...formData,
      estado: 'estacionado'
    });

    setFormData({
      patente: '',
      marca: '',
      modelo: '',
      horaEntrada: '',
      cliente: '',
      permanente: false,
    });
  };

  return (
    <div className="vehicle-form-container glass-panel">
      <h2>Ingresar Vehículo</h2>
      {error && <div className="form-error">{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="form-group">
          <label htmlFor="patente">Patente</label>
          <input
            type="text"
            id="patente"
            name="patente"
            value={formData.patente}
            onChange={handleChange}
            className="form-input"
            placeholder="Ej: AB-CD-12"
          />
        </div>

        <div className="form-group">
          <label htmlFor="marca">Marca</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            className="form-input"
            placeholder="Ej: Toyota"
          />
        </div>

        <div className="form-group">
          <label htmlFor="modelo">Modelo</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            className="form-input"
            placeholder="Ej: Yaris"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cliente">Nombre del Cliente</label>
          <input
            type="text"
            id="cliente"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            className="form-input"
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="form-group">
          <label htmlFor="horaEntrada">Hora de Entrada</label>
          <input
            type="time"
            id="horaEntrada"
            name="horaEntrada"
            value={formData.horaEntrada}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            id="permanente"
            name="permanente"
            checked={formData.permanente}
            onChange={handleChange}
            style={{ width: 'auto' }}
          />
          <label htmlFor="permanente" style={{ marginBottom: 0 }}>Es abonado (permanente)</label>
        </div>

        <button type="submit" className="primary" style={{ marginTop: '0.5rem' }}>
          Registrar Entrada
        </button>
      </form>
    </div>
  );
}

export default VehicleForm;
