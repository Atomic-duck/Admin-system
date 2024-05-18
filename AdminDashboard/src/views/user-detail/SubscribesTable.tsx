import { useEffect, useState } from 'react'

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
import { Alert, Button, CircularProgress, Link } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

// ** Types Imports
import { deleteSub } from 'src/api/dataApi'

interface Waypoint {
  coordinates: [number, number]
  name: string
}

interface RowType {
  _id: string
  email: string
  distance: number
  waypoints: Waypoint[]
  name: string
  start: string
  end: string
  repeat: number[]
}

const getRepeatDisplay = (value: number[]) => {
  let repeatDisplay = "";
  if (value[0] == 0) repeatDisplay = "Một lần";
  else if (value[0] == 10) repeatDisplay = "Hằng ngày";
  else if (value[0] == 26) repeatDisplay = "Thứ hai đến Thứ sáu";
  else {
    value.sort((a, b) => a - b);
    for (let i = 0; i < value.length; i++) {
      if (i > 0) repeatDisplay += ' ';
      if (value[i] == 8) repeatDisplay += 'CN';
      else repeatDisplay += 'Th ' + value[i];
    }
  }

  return repeatDisplay;
}

const SubscribesTable = ({ subscribes }) => {
  const [rows, setRows] = useState<RowType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notify, setNotify] = useState<{ success: boolean, mess: string } | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setRows(subscribes);
      setLoading(false);
    })();
  }, [subscribes]);

  const handleDelete = async (id: string) => {
    if (loading) return;

    setLoading(true);
    const success = await deleteSub(id);

    if (success) {
      displayAlert(success, 'Xóa thành công');
      setRows(rows.filter(row => row._id !== id));
    } else {
      displayAlert(success, 'Có lỗi xảy ra');
    }

    setLoading(false);
  }

  const displayAlert = (success: boolean, mess: string) => {
    setNotify({
      success,
      mess
    });

    setTimeout(() => {
      setNotify(null);
    }, 1000);
  }

  return (
    <Card>
      {loading && <CircularProgress style={{ position: 'fixed', top: '50%', left: '50%' }} />}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Bắt đầu</TableCell>
              <TableCell>Kết thúc</TableCell>
              <TableCell>Khoảng cách</TableCell>
              <TableCell>Lặp lại</TableCell>
              <TableCell>Điểm dừng</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: RowType) => (
              <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.start}</TableCell>
                <TableCell>{row.end}</TableCell>
                <TableCell>{(row.distance / 1000).toFixed(2)} km</TableCell>
                <TableCell>{getRepeatDisplay(row.repeat)}</TableCell>
                <TableCell>
                  {row.waypoints.map((wp, index) => (
                    <Typography key={index}>Đ{index + 1}: {wp.name}</Typography>
                  ))}
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
      {notify && notify.success && <Alert severity="success" style={{ position: 'absolute', marginTop: 20 }}>{notify.mess}</Alert>}
      {notify && !notify.success && <Alert severity="error" style={{ position: 'absolute', marginTop: 20 }}>{notify.mess}</Alert>}
    </Card>
  )
}

export default SubscribesTable
