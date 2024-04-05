// Citas.js
import  { useState } from 'react';
import styled from '@emotion/styled';
import { Tabla } from '../table/Tabla';
import { datosCitas } from '../datos/Citas';
import { ExcelExportButton } from '../buttons/ExcelExportButton ';
import {PDFGenerator} from "../buttons/PdfGenerator";
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Titulo = styled.h1`
  font-size: 24px;
  color: #333;
`;

const FiltroContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;

  & > div {
    margin-right: 15px;
    margin-bottom: 10px;
  }

  & > div:last-child {
    margin-right: 0;
  }
`;

const Label = styled.label`
  font-size: 16px;
  margin-right: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export function Citas() {
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('');
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('');
  const [filtroTipoServicio, setFiltroTipoServicio] = useState('');
  const [citasFiltradas, setCitasFiltradas] = useState([]);
  const [citasExportar, setCitasExportar] = useState([]);

  const handleFiltrarClick = () => {
    const citasFiltradasTemp = datosCitas.filter(cita => {
      const fechaCita = new Date(cita.fecha_cita);
      const fechaDesde = filtroFechaDesde ? new Date(filtroFechaDesde) : null;
      const fechaHasta = filtroFechaHasta ? new Date(filtroFechaHasta) : null;

      if (fechaDesde && fechaCita < fechaDesde) {
        return false;
      }

      if (fechaHasta && fechaCita > fechaHasta) {
        return false;
      }

      if (filtroTipoServicio && cita.id_tipo_servicio !== parseInt(filtroTipoServicio)) {
        return false;
      }

      return true;
    });

    setCitasFiltradas(citasFiltradasTemp);
    setCitasExportar(citasFiltradasTemp);
  };

  return (
    <Container>
      <Titulo>Citas</Titulo>
      <FiltroContainer>
        <div>
          <Label htmlFor="filtroFechaDesde">Desde:</Label>
          <Input 
            id="filtroFechaDesde"
            type="date" 
            value={filtroFechaDesde} 
            onChange={(e) => setFiltroFechaDesde(e.target.value)} 
          />
        </div>
        <div>
          <Label htmlFor="filtroFechaHasta">Hasta:</Label>
          <Input 
            id="filtroFechaHasta"
            type="date" 
            value={filtroFechaHasta} 
            onChange={(e) => setFiltroFechaHasta(e.target.value)} 
          />
        </div>
        <div>
          <Label htmlFor="filtroTipoServicio">Tipo de Servicio:</Label>
          <Select id="filtroTipoServicio" value={filtroTipoServicio} onChange={(e) => setFiltroTipoServicio(e.target.value)}>
            <option value="">Todos</option>
            <option value="1">Servicio 1</option>
            <option value="2">Servicio 2</option>
            <option value="3">Servicio 3</option>
          </Select>
        </div>
        <Button onClick={handleFiltrarClick}>Filtrar</Button>
        <ExcelExportButton data={citasExportar} columns={['ID', 'ID Cita', 'ID FK', 'Tipo de Servicio', 'Fecha de Cita', 'Nombre Persona', 'Apellido Persona', 'Celular', 'Documento de Identidad', 'Reserva de Cita']} />
        <PDFGenerator
            data={citasExportar}
            columns={[
                'id',
                'id_cita',
                'id_fk',
                'id_tipo_servicio',
                'fecha_cita',
                'nombre_persona',
                'apellido_persona',
                'celular',
                'documento_identidad',
                'reserva_cita',
            ]}
            />
      </FiltroContainer>
      {citasFiltradas.length > 0 && (
        <Tabla columnas={['ID', 'ID Cita', 'ID FK', 'Tipo de Servicio', 'Fecha de Cita', 'Nombre Persona', 'Apellido Persona', 'Celular', 'Documento de Identidad', 'Reserva de Cita']} datos={citasFiltradas} />
      )}
    </Container>
  );
}
