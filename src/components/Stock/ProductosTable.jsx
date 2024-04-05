import React from 'react';
import styled from '@emotion/styled';

// Estilos usando Emotion Styled
const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 8px;
`;

export function ProductosTable({ productosVendidos }) {
  return (
    <Container>
      <Title>Productos más vendidos</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Cantidad Vendida</TableHeader>
            <TableHeader>Stock Restante</TableHeader>
          </tr>
        </thead>
        <tbody>
          {productosVendidos.map((producto, index) => (
            <TableRow key={index}>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>{producto.cantidadVendida}</TableCell>
              <TableCell>{producto.cantidadEnLote - producto.cantidadVendida}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductosTable;
