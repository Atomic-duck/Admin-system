import { useEffect, useState, ChangeEvent } from 'react'

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
import { TextField, MenuItem } from '@mui/material'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { deleteReport, fetchReports } from 'src/api/dataApi'
import { Alert, Button, CircularProgress, Link } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface RowType {
  _id: string
  coordinates: number[]
  conditions: { condition: string }[]
  timestamp: string
  email: string
  imgUrl: string
}

const ReportsTable = () => {
  const [rows, setRows] = useState<RowType[]>([]);
  const [filteredRows, setFilteredRows] = useState<RowType[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [notify, setNotify] = useState<{ success: Boolean, mess: String } | null>();
  const [conditionFilter, setConditionFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const reports = await fetchReports();
      setRows(reports);
      setFilteredRows(reports);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    filterRows();
  }, [conditionFilter, startDate, endDate, rows]);

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

  const filterRows = () => {
    let filtered = rows;

    if (conditionFilter) {
      filtered = filtered.filter(row => row.conditions.some(c => c.condition === conditionFilter));
    }

    if (startDate && endDate) {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      filtered = filtered.filter(row => {
        const timestamp = new Date(row.timestamp).getTime();
        return timestamp >= start && timestamp <= end;
      });
    }

    setFilteredRows(filtered);
  }

  const clearFilters = () => {
    setConditionFilter('');
    setStartDate('');
    setEndDate('');
    setFilteredRows(rows);
  }

  return (
    <Card>
      {loading && <CircularProgress style={{ position: 'fixed', top: '50%', left: '50%' }} />}
      <Box sx={{ padding: 2, display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="TÌNH TRẠNG"
            value={conditionFilter}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConditionFilter(e.target.value)}
            fullWidth
          />
          <TextField
            label="Từ ngày"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
            fullWidth
          />
          <TextField
            label="Đến ngày"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
            fullWidth
          />
        </Box>
        <Button style={{ width: 200 }} variant="outlined" onClick={clearFilters}>Xóa bộ lọc</Button>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell>Tọa độ</TableCell>
              <TableCell>Tình trạng</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Người báo cáo</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row: RowType) => (
              <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  {row.coordinates.toString()}
                </TableCell>
                <TableCell>{row.conditions.map(c => c.condition).join(', ')}</TableCell>
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
