// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import UsersTable from 'src/views/users-management/UsersTable'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Danh sách người dùng' titleTypographyProps={{ variant: 'h6' }} />
          <UsersTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
