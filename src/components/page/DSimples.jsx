import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DSimples = () => {
  const [datos, setDatos] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/tramite/api.php');
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleExportar = async () => {
    // Filtrar los datos según el rango de fechas seleccionado
    const datosFiltrados = datos.filter(dato => {
      const fechaDato = new Date(dato.fecha_solicitud);
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);

      return fechaDato >= inicio && fechaDato <= fin;
    });

    // Enviar datos filtrados al backend para guardar en la base de datos
    try {
      const response = await axios.post('http://localhost/tramite/save_excel.php', {
        datos: datosFiltrados
      });
      console.log('Datos guardados en la base de datos:', response.data);
    } catch (error) {
      console.error('Error al guardar datos en la base de datos:', error);
    }
  };

  return (
    <div>
      <h1>Exportar Datos</h1>
      <div>
        <label>Fecha de inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha de fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
      </div>
      <button onClick={handleExportar}>Exportar</button>
    </div>
  );
};
