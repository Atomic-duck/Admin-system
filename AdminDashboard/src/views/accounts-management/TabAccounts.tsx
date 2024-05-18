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

// ** Types Imports
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, CircularProgress } from '@mui/material'
import { deleteAccount, fetchAccounts } from 'src/api/dataApi'

interface RowType {
  _id: string,
  username: string,
  passord: string,
  role: string
}

const TabAccounts = () => {
  const [rows, setRows] = useState<RowType[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [notify, setNotify] = useState<{ success: Boolean, mess: String } | null>();

  useEffect(() => {
    (async () => {
      setRows(await fetchAccounts());
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (loading) return;

    setLoading(true);
    const success = await deleteAccount(id);

    if (success) {
      displayAlert(success, 'Xóa thành công')
      setRows(rows.filter(row => row._id != id));
    } else {
      displayAlert(success, 'Có lỗi xảy ra')
    }

    setLoading(false);
  }

  const displayAlert = (success: Boolean, mess: String) => {
    setNotify({
      success,
      mess
    })

    setTimeout(() => {
      setNotify(null);
    }, 1000)
  }

  return (
    <Card>
      {
        loading && <CircularProgress style={{ position: 'fixed', top: '50%', left: '50%' }} />
      }
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: RowType) => (
              <TableRow hover key={row.username} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.username}</Typography>
                </TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Button variant="outlined" startIcon={<DeleteIcon />} size='small' onClick={() => handleDelete(row._id)}>
                      Xóa
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        notify && notify.success && <Alert severity="success" style={{ position: 'absolute', marginTop: 20 }}>{notify.mess}</Alert>
      }
      {
        notify && !notify.success && <Alert severity="error" style={{ position: 'absolute', marginTop: 20 }}>{notify.mess}</Alert>
      }
    </Card>
  )
}

export default TabAccounts
