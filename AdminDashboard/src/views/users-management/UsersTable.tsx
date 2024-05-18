import { useEffect, useState, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import Link from 'next/link'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { deleteUser, fetchUsers } from 'src/api/dataApi'

interface RowType {
  name: string
  email: string
}

const UsersTable = () => {
  const [rows, setRows] = useState<RowType[]>([]);
  const [filteredRows, setFilteredRows] = useState<RowType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    (async () => {
      const users = await fetchUsers();
      setRows(users);
      setFilteredRows(users);
    })();
  }, []);

  useEffect(() => {
    setFilteredRows(
      rows.filter(row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, rows]);

  const handleDelete = (email: string) => {
    console.log('delete', email);
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  return (
    <Card>
      <Box sx={{ padding: 2 }}>
        <TextField
          fullWidth
          label="Tìm kiếm theo tên hoặc email"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row: RowType) => (
              <TableRow hover key={row.email} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10 }}>
                    <Link passHref href={row.email === undefined ? '/' : `/user-detail/${row.email}`}>
                      <Button
                        variant="outlined"
                        startIcon={<InfoIcon />}
                        size='small'
                        sx={{ marginRight: 1 }}
                      >
                        Chi tiết
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      size='small'
                      onClick={() => handleDelete(row.email)}
                    >
                      Xóa
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default UsersTable
