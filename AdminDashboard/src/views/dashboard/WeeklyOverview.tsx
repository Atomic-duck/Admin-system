// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import { fetchReportsCount } from 'src/api/dataApi'

// Get today's date
const today = new Date();

// Initialize an array to hold the categories
const categories: string[] = [];

// Loop through the last 7 days, starting from today
for (let i = 6; i >= 0; i--) {
  // Get the date for the current iteration
  const date = new Date(today);
  date.setDate(today.getDate() - i);

  // Format the date as "YYYY-MM-DD" and push it to the categories array
  categories.push(date.getDate() + '/' + (date.getMonth() + 1));
}

const WeeklyOverview = () => {
  const [counts, setCounts] = useState([]);
  const preDays = 7;

  useEffect(() => {
    (async () => {
      const counts = await fetchReportsCount(preDays);
      setCounts(counts.map(e => e.count));
    })()
  }, [])
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [
      '#F44336',
      '#F44336',
      '#F44336',
      '#F44336',
      '#F44336',
      '#F44336'
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: categories,
      tickPlacement: 'on',
      labels: { show: true },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Báo cáo trong 7 ngày'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={205} options={options} series={[{ data: counts }]} />
        <Button fullWidth variant='contained'>
          Chi tiết
        </Button>
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
