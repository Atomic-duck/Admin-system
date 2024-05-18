// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import ReportsTable from 'src/views/reports-management/ReportsTable'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Danh sách báo cáo' titleTypographyProps={{ variant: 'h6' }} />
          <ReportsTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
