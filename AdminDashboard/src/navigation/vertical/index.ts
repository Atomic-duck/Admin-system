// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import ReportIcon from '@mui/icons-material/Report';
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import GlobeModel from 'mdi-material-ui/GlobeModel'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Quản lý báo cáo',
      icon: ReportIcon,
      path: '/reports-management'
    },
    {
      title: 'Quản lý người dùng',
      icon: AccountGroup,
      path: '/users-management'
    },
  ]
}

export default navigation
