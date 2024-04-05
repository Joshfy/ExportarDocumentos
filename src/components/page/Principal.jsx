import React from 'react';
import styled from '@emotion/styled';
import { Descargar } from '../Descargar';
const ContentTable = styled.div`
background-color: white;
display: flex;
width: 100%;
justify-content:center;
margin-right: 50px;
`;
const CTitle = styled.div`
justify-content: center;
margin: 50px;
flex-direction: row;
gap: 20%;
`;
const CGen = styled.div`
background-color: white;
margin: 20px;
border: 1px solid black;
width: 70%;
height: 70vh;
`;
// Componente de tabla con datos ficticios
export const Principal = () => {
  return (
    <> 
    <CGen>
    <CTitle>
    <h2>Listado de Ventas</h2>
    <span>Elige las fechas para  su reporte :D</span>
    </CTitle>
    <ContentTable>
      <Descargar/>
      {/* <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Fecha de Solicitud</TableHeadCell>
          <TableHeadCell>Nombre</TableHeadCell>
          <TableHeadCell>Apellido Materno</TableHeadCell>
          <TableHeadCell>Apellido Paterno</TableHeadCell>
          <TableHeadCell>Tipo de Documento</TableHeadCell>
          <TableHeadCell>DNI</TableHeadCell>

          </TableRow>
        </TableHead>
        <tbody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
            <TableCell>{item.solicitudDate}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.motherLastName}</TableCell>
            <TableCell>{item.fatherLastName}</TableCell>
            <TableCell>{item.documentType}</TableCell>
            <TableCell>{item.documentNumber}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table> */}
      </ContentTable>
      </CGen>
    </>
  );
};

