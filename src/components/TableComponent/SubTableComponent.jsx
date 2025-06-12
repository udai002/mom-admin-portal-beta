import * as React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow
} from '@mui/material';
import { BsFillTrashFill, BsFillPencilFill, BsCheckLg } from 'react-icons/bs';

export default function SubReusableTable({
  columns,
  rows,
  onDelete,
  onEditSave,
  rowsPerPageOptions = [10, 25, 100]
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  const [editId, setEditId] = React.useState(null);
  const [editValue, setEditValue] = React.useState('');

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const startEdit = (row) => {
    setEditId(row._id);
    setEditValue(row.subcategory_name); // customized for subcategory
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue('');
  };

  const saveEdit = () => {
    if (onEditSave && editId) {
      onEditSave(editId, editValue);
    }
    setEditId(null);
    setEditValue('');
  };

  const columnsWithActions = [
    ...columns,
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 120,
      align: 'center',
    }
  ];

  return (
    <div className="p-4">
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columnsWithActions.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    sx={{
                      backgroundColor: '#00a99d',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 14,
                      padding: '12px 16px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow
                    hover
                    key={idx}
                    sx={{ '&:hover': { backgroundColor: '#f0fdfa' } }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align || 'left'}
                        sx={{
                          fontSize: 14,
                          padding: '10px 16px',
                          color: '#333',
                        }}
                      >
                        {column.id === 'subcategory_name' && editId === row._id ? (
                          <input
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') saveEdit();
                              if (e.key === 'Escape') cancelEdit();
                            }}
                            autoFocus
                            className="w-full border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        ) : (
                          row[column.id]
                        )}
                      </TableCell>
                    ))}

                    <TableCell align="center" sx={{ padding: '10px 16px' }}>
                      {editId === row._id ? (
                        <button
                          onClick={saveEdit}
                          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-200"
                          title="Save"
                        >
                          <BsCheckLg />
                        </button>
                      ) : (
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => startEdit(row)}
                            className="text-teal-900 p-2 rounded border transition border-teal-700"
                            title="Edit"
                          >
                            <BsFillPencilFill />
                          </button>
                          <button
                            onClick={() => onDelete?.(row._id)}
                            className="text-teal-900 p-2 rounded border transition border-teal-700"
                            title="Delete"
                          >
                            <BsFillTrashFill />
                          </button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '.MuiTablePagination-toolbar': {
              padding: '0 16px',
              backgroundColor: '#f1f5f9',
            },
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              fontSize: '13px',
            }
          }}
        />
      </Paper>
    </div>
  );
}
