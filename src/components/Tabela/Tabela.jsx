import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Tabela = React.memo(({ infoVeiculo }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2, marginLeft: '275px' }}>
      <Table sx={{ minWidth: 100 }} aria-label="vehicle information table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>Campo</TableCell>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(infoVeiculo).map(([key, value], index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
                {key}
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

Tabela.displayName = 'Tabela';

export default Tabela;
