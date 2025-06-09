import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';


const columns = [
  { id: 'name', label: 'Name', minWidth: 170,align: 'center', },
  { id: 'age', label: 'Age', minWidth: 100,align: 'center', },
   {
    id: 'mobilenumber',
    label: 'Mobilenumber',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'dateofbirth',
    label: 'Dateofbirth',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'bgroup',
    label: 'Blood group',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
 
];

function createData(name, age, mobilenumber,dateofbirth,state,bgroup

) {
  
  return { name, age,mobilenumber,dateofbirth, state,bgroup };
}

const rows = [
  createData('akhila', '18', '7995357794','20/10/2003','telangana','B+' ),
  createData('Bhavani', '19', '7995357794','20/10/2003','andhrapradesh', 'A+'),
  createData('Teja', '22', '7995357794','20/10/2003','tamilnadu','o+' ),
  createData('akhila', '18', '7995357794','20/10/2003','telangana','B+' ),
  createData('Bhavani', '19', '7995357794','20/10/2003','andhrapradesh', 'A+'),
  createData('Teja', '22','7995357794','20/10/2003', 'tamilnadu','o+' ),
  createData('Bhavani', '19', '7995357794','20/10/2003','andhrapradesh', 'A+'),
  createData('Teja', '22', '7995357794','20/10/2003','tamilnadu','o+' ),
  createData('Bhavani', '19', '7995357794','20/10/2003','20/10/2003','andhrapradesh', 'A+'),
  createData('Teja', '22', '7995357794','20/10/2003','tamilnadu','o+' ),
];

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
    <div>
    <div className="search">
    <TextField label="Search" />
     </div>
    <Paper sx={{ width: '100%', overflow: 'hidden',marginTop:5,justifyContent:'center',alignItems:'center'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,background:'#00a99d',fontSize:20 }}
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
                        <TableCell key={column.id} align={column.align} style={{ fontSize:15,fontFamily:"sans-serif",alignItems:'center'}}>
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
        rowsPerPageOptions={[10, 20, 35]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}
