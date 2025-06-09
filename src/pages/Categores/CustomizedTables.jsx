import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';



const columns = [
  { id: 'name', label: 'id', minWidth: 170 },
  { id: 'code', label: 'category', minWidth: 100 },
 
  
 
];



function createData(name, code,) {
  return { name, code,};
}

const rows = [
  createData('1', 'Hair Care',),
  createData('2', 'Baby Care', ),
  createData('3', 'Women Care', ),
  createData('4', 'Diabaitc', ),
  createData('5', 'Skin Care', ),
  createData('6', 'Fever', ),
  createData('7', 'Asthama', ),
  createData('8', 'Blood Pressure', ),
  createData('9', 'Hart',),
  createData('10', 'JP', ),
  createData('1', 'Hair Care',),
  createData('2', 'Baby Care', ),
  createData('3', 'Women Care', ),
  createData('4', 'Diabaitc', ),
  createData('5', 'Skin Care', ),
  createData('6', 'Fever', ),
  createData('7', 'Asthama', ),
  createData('8', 'Blood Pressure', ),
  createData('9', 'Hart',),
  createData('10', 'JP', ),
];
export  function ColorButtons() {
 const navigate = useNavigate();
 const togglePopup = ()=>{
  navigate('/forms');
 }
 
  return (
    <Stack direction="row" spacing={2} marginBottom={2}>
      <TextField  label="Search" variant="outlined" />
      
      <Button
      onClick={togglePopup}
      className='btn'
      variant='contained'
      sx={{ backgroundColor: '#05a99d',  }}
>
        Add 
      </Button>
    </Stack>
  );
}
export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    
    <Paper sx={{ marginLeft:50,marginTop:10, width: 500, overflow: 'hidden' ,}}>
      <ColorButtons/>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth ,backgroundColor:'#00a99d'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    
  );
}
