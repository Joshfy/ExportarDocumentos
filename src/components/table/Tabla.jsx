import React from 'react';
import styled from '@emotion/styled';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f3f3f3;
`;

const StyledTh = styled.th`
  background-color: #2f7bc7;
  color: white;
  padding: 12px 15px;
  text-align: left;
  border-bottom: 2px solid #4CAF50;
`;

const StyledTd = styled.td`
text-align:center;
  padding: 8px 15px;
  border-bottom: 1px solid #ddd;
`;

export function Tabla({ columnas, datos }) {
  return (
    <StyledTable>
      <thead>
        <tr>
          {columnas.map((columna, index) => (
            <StyledTh key={index}>{columna}</StyledTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {datos.map((fila, index) => (
          <tr key={index}>
            {Object.values(fila).map((valor, index) => (
              <StyledTd key={index}>{valor}</StyledTd>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}
