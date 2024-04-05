// Ventas.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Alert } from './Alerts';
import { ExcelExportButton } from '../buttons/ExcelExportButton ';
import { PDFGenerator } from '../buttons/PdfGenerator';

export const Ventas = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ventas, setVentas] = useState([]);
  const [mostrarHead, setMostrarHead] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://practivet-api.rino101.com/api/ventas/ShowVentasPorFecha?fromDate=${startDate}&toDate=${endDate}`);
      const data = response.data.data;
      setVentas(data);
      setMostrarHead(true);
      setShowAlert(data.length === 0);
    } catch (error) {
      console.error('Error al obtener los datos de ventas:', error);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <Container>
      <Title>Ventas</Title>
      <p>Elige las fechas para poder realizar un reporte</p>
      <DateRangeContainer>
        <DateInputWrapper>
          <DateInputLabel>Desde:</DateInputLabel>
          <DateInput
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </DateInputWrapper>
        <DateInputWrapper>
          <DateInputLabel>Hasta:</DateInputLabel>
          <DateInput
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </DateInputWrapper>
        <Button onClick={fetchData}>Filtrar</Button>
        {ventas.length > 0 && (
          <>
            <ExcelExportButton
              data={ventas}
              columns={[
                'ID Venta',
                'ID Cliente',
                'Estado Venta',
                'Método de Pago',
                'Monto Total',
                'Fecha de Venta',
                'ID Sucursal',
              ]}
            />
        <PDFGenerator
                      data={ventas}
                      columns={[
                        'id_venta',
                        'id_cliente',
                        'id_estado_venta',
                        'metodo_pago',
                        'monto_total_venta',
                        'fecha_venta',
                        'id_sucursal',
                      ]}
                    />        
                      </>
        )}
        {showAlert && (
          <Alert message="No hay ventas para la fecha seleccionada" />
        )}
      </DateRangeContainer>
      {mostrarHead && (
        <TableWrapper>
          <DataTable id="ventas-table">
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID Venta</TableHeaderCell>
                <TableHeaderCell>ID Cliente</TableHeaderCell>
                <TableHeaderCell>Estado Venta</TableHeaderCell>
                <TableHeaderCell>Método de Pago</TableHeaderCell>
                <TableHeaderCell>Monto Total</TableHeaderCell>
                <TableHeaderCell>Fecha de Venta</TableHeaderCell>
                <TableHeaderCell>ID Sucursal</TableHeaderCell>
              </TableRow>
            </TableHead>
            <tbody>
              {ventas.map((venta) => (
                <TableRow key={venta.id_venta}>
                  <TableCell>{venta.id_venta}</TableCell>
                  <TableCell>{venta.id_cliente}</TableCell>
                  <TableCell>{venta.id_estado_venta}</TableCell>
                  <TableCell>{venta.metodo_pago}</TableCell>
                  <TableCell>{venta.monto_total_venta}</TableCell>
                  <TableCell>{venta.fecha_venta}</TableCell>
                  <TableCell>{venta.id_sucursal}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </DataTable>
        </TableWrapper>
      )}
    </Container>
  );
};

// Estilos y componentes styled-components aquí...

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  width: 100%;
  height: 70%;
`;

const Title = styled.h1`
  text-align: center;
`;

const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DateInputWrapper = styled.div`
  margin-right: 10px;
`;

const DateInputLabel = styled.label`
  font-weight: bold;
  font-size: 1.3em;
  margin-right: 10px;
`;

const DateInput = styled.input`
  padding: 5px;
  font-size: 1.3em;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  margin-left: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 74px;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
  border-bottom: 3px solid black;
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
    border-bottom: 3px solid black;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border-bottom: 3px solid black;
`;

const TableHeaderCell = styled.th`
  padding: 8px;
  border: 1px solid #ddd;
`;
