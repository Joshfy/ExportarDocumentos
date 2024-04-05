// PdfGenerator.js
import React from 'react';
import styled from '@emotion/styled';
import 'jspdf-autotable';
import jsPDF from 'jspdf';

export const PDFGenerator = ({ data, columns }) => {
  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      const tableRows = [];
      
      // Preparar filas de la tabla
      data.forEach(item => {
        const rowData = columns.map(column => item[column]);
        tableRows.push(rowData);
      });

      // Configurar PDF
      doc.text('Reporte', 14, 15);
      doc.autoTable(columns, tableRows, { startY: 20 });

      doc.save('reporte.pdf');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  return (
    <Button onClick={generatePDF}>Generar PDF</Button>
  );
};

const Button = styled.button`
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
`;
