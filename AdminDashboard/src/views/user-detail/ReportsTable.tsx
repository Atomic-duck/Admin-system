// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { useEffect, useState } from 'react'
import { deleteReport, fetchReports } from 'src/api/dataApi'
import { Alert, Button, CircularProgress, Link } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { setInterval } from 'timers/promises'

interface RowType {
  _id: string
  coordinates: number[]
  conditions: any[]
  timestamp: string
  email: string
  imgUrl: string
}

const ReportsTable = ({ reports }) => {
  const [rows, setRows] = useState<RowType[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [notify, setNotify] = useState<{ success: Boolean, mess: String } | null>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setRows(reports);
      setLoading(false);
    })();
  }, [reports]);

  const handleDelete = async (id: string) => {
    if (loading) return;

    setLoading(true);
    const success = await deleteReport(id);

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
              <TableCell>Tọa độ (long, lat)</TableCell>
              <TableCell>Tình trạng</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Người báo cáo</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: RowType, index) => (
              <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  {row.coordinates.toString()}
                </TableCell>
                <TableCell>{row.conditions.reduce((name, e, idx) => name + e.condition + (idx == row.conditions.length - 1 ? '' : ', '), "")}</TableCell>
                <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                <TableCell>{row.email ? row.email : 'Ẩn danh'}</TableCell>
                <TableCell>
                  <Link href={row.imgUrl} underline="hover" target="_blank" rel="noopener noreferrer">Xem ảnh</Link>
                </TableCell>
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

export default ReportsTable
