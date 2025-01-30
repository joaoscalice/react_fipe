import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TabelaWishList = React.memo(({ wishlist }) => {
  console.log('wishlist:', wishlist);
  if (!wishlist || wishlist.length <= 0) {
    return <p>Nenhum item na wishlist.</p>;
  }

  const wishlistItems = Object.values(wishlist); 

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2, marginLeft: '375px' }}>
      <Table sx={{ minWidth: 100 }} aria-label="wishlist vehicle table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>Campo</TableCell>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wishlistItems.map((item, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
                  Marca
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.marca}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
                  Modelo
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.modelo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
                  Ano
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.ano}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
                  Valor
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{item.valor}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

TabelaWishList.displayName = 'TabelaWishList';

export default TabelaWishList;
