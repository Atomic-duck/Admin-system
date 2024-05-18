import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box, Card, CardHeader, Grid, Typography } from '@mui/material'
import ReportsTable from 'src/views/user-detail/ReportsTable'
import { fetchUserDetail, deleteAccount } from 'src/api/dataApi'
import SubscribesTable from 'src/views/user-detail/SubscribesTable'
import User from 'src/views/user-detail/User'

const UserDetail = () => {
  const router = useRouter()
  const { email } = router.query
  const [userDetail, setUserDetail] = useState<any>(null)

  useEffect(() => {
    if (email) {
      (async () => {
        const userDetail = await fetchUserDetail(email as string)
        setUserDetail(userDetail)
      })()
    }
  }, [email])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={'Người dùng: ' + email} titleTypographyProps={{ variant: 'h6' }} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Tuyến đường theo dõi' titleTypographyProps={{ variant: 'h6' }} />
          <SubscribesTable subscribes={userDetail ? userDetail.subscribes : []} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Báo cáo đã đăng' titleTypographyProps={{ variant: 'h6' }} />
          <ReportsTable reports={userDetail ? userDetail.reports : []} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserDetail
