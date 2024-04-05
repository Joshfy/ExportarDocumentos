import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import styled from '@emotion/styled';
import { jsPDF } from 'jspdf';
  import 'jspdf-autotable';

///////****/////////// */

const handleExportarPDF = () => {
  // Generar el archivo PDF
  const doc = new jsPDF();

  // Agregar título al PDF
  doc.text('Reporte en PDF', 10, 10);

  // Obtener los datos de la tabla
  const tabla = document.getElementById('tabla-datos');

  // Agregar la tabla al PDF
  doc.autoTable({ html: tabla });

  // Guardar el PDF
  doc.save(`datos_${Date.now()}.pdf`);
};



export const Descargar = () => {
  const [datos, setDatos] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [datosExportar, setDatosExportar] = useState([]);
  const [mostrarBotonPDF, setMostrarBotonPDF] = useState(false); // Estado para controlar la visibilidad del botón PDF
  const[mostrarHead, setMostrarHead] = useState(false); // Estado para controlar la visibilidad del botón PDF
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

  const handleExportar = () => {
    // Filtrar los datos según el rango de fechas seleccionado
    const datosFiltrados = datos.filter(dato => {
      const fechaDato = new Date(dato.fecha_solicitud);
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);

      return fechaDato >= inicio && fechaDato <= fin;
    });

    // Establecer los datos filtrados para exportar
    setDatosExportar(datosFiltrados);
    setMostrarBotonPDF(true);
    setMostrarHead(true);

  };

  return (
    <Container>
      <Title></Title>
      <DateRangeContainer>
        <div>
          <DateInputLabel>Fecha de inicio:</DateInputLabel>
          <DateInput
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div>
          <DateInputLabel>Fecha de fin:</DateInputLabel>
          <DateInput
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
      </DateRangeContainer>
      <Button onClick={handleExportar}>Exportar</Button>
      {mostrarBotonPDF && ( // Mostrar botón PDF solo si se han exportado datos
        <Button onClick={handleExportarPDF} className='PDF'>Exportar como PDF</Button>
      )}

      {datosExportar.length > 0 && (
        <ExcelButton
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="tabla-datos"
          filename="datos_excel"
          sheet="datos_excel"
          buttonText="Exportar a Excel"
          
        />

      )}
      <TableWrapper>
        <DataTable id="tabla-datos">
        {mostrarHead && ( // Mostrar botón PDF solo si se han exportado datos
        <TableHead>
        <tr>
          <th>ID</th>
          <th>Fecha de Solicitud</th>
          <th>Nombre</th>
          <th>Apellido Materno</th>
          <th>Apellido Paterno</th>
          <th>Tipo de Documento</th>
          <th>DNI</th>
        </tr>
      </TableHead>
      )}
          
          <tbody>
            {datosExportar.map((dato) => (
              <TableRow key={dato.id}>
                <TableCell>{dato.id}</TableCell>
                <TableCell>{dato.fecha_solicitud}</TableCell>
                <TableCell>{dato.nombres}</TableCell>
                <TableCell>{dato.apellido_materno}</TableCell>
                <TableCell>{dato.apellido_paterno}</TableCell>
                <TableCell>{dato.tipo_documento}</TableCell>
                <TableCell>{dato.numero_documento}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </DataTable>
      </TableWrapper>
    </Container>
  );
};



const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const DateRangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 50px;
`;

const DateInputLabel = styled.label`
  font-weight: bold;
`;

const DateInput = styled.input`
  padding: 5px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  &.PDF{
    margin-left: 20px;
    background-color: red;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;
const ExcelButton = styled(ReactHTMLTableToExcel)`
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-left: 15px;
  cursor: pointer;
`;