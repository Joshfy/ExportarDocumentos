import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import styled from '@emotion/styled';

export const ExcelExportButton = ({ data, columns }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    let dataFinal = [];
    const title = [{ A: 'Report' }, {}];
    const additionalInfo = {
      A: `Created by: User on ${new Date().toLocaleDateString()}`,
    };

    let table = [];
    if (columns && columns.length > 0) {
      const headerRow = {};
      columns.forEach((column, index) => {
        headerRow[String.fromCharCode(65 + index)] = column;
      });
      table.push(headerRow);
    }

    data.forEach((item) => {
      const rowData = {};
      Object.keys(item).forEach((key, index) => {
        rowData[String.fromCharCode(65 + index)] = item[key];
      });
      table.push(rowData);
    });

    dataFinal = [...title, ...table, additionalInfo];

    setTimeout(() => {
      createExcelFile(dataFinal);
      setLoading(false);
    }, 1000);
  };

  const createExcelFile = (dataFinal) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

    if (typeof dataFinal[0] === 'object' && Object.keys(dataFinal[0]).length > 0) {
      worksheet['!merges'] = [
        XLSX.utils.decode_range('A1:Z1'),
        XLSX.utils.decode_range('A2:Z2'),
      ];

      let properties = [];
      Object.keys(dataFinal[0]).forEach((_, index) => {
        properties.push({ width: 10 });
      });
      worksheet['!cols'] = properties;
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    XLSX.writeFile(workbook, 'Report.xlsx');
  };

  return (
    <>
      {!loading ? (
        <StyledButton onClick={handleDownload}>
          Export to Excel
        </StyledButton>
      ) : (
        <StyledButton disabled>
          <StyledSpinner />
          Generating...
        </StyledButton>
      )}
    </>
  );
};

const StyledButton = styled.button`
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-left: 15px;
  cursor: pointer;
`;

const StyledSpinner = styled.div`
  border: 2px solid #fff;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-right: 5px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
