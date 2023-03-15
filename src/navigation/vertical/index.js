// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import { AccountDetailsOutline, BookSettingsOutline, CashCheck, ChartTimelineVariant, CurrencyEth, TextAccount } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Transactions',
      icon: AccountDetailsOutline,
      path: '/pages/transactions',
      openInNewTab: false
    },
    {
      title: 'Analysis',
      icon: ChartTimelineVariant,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      sectionTitle: 'Reports'
    },
    {
      title: 'Cashflow Statement',
      icon: CashCheck,
      path: '/pages/cashflow',
      openInNewTab: true
    },
    {
      title: 'Profit & Loss Statement',
      icon: TextAccount,
      path: '/pages/pnlstatement',
      openInNewTab: true
    },
    {
      title: 'Balance Sheet',
      icon: CurrencyEth,
      path: '/pages/balancesheet',
      openInNewTab: true
    },
    {
      title: 'Rule Book',
      icon: BookSettingsOutline,
      path: '/pages/rulebook',
      openInNewTab: true
    }
    // ,
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
