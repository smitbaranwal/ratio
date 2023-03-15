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
      sectionTitle: 'Reports'
    },
    {
      title: 'Transactions',
      icon: AccountDetailsOutline,
      path: '/reports/transactions',
      openInNewTab: false
    },
    {
      title: 'Cashflow Statement',
      icon: CashCheck,
      path: '/reports/cashflow',
      openInNewTab: false
    },
    {
      title: 'Profit & Loss Statement',
      icon: TextAccount,
      path: '/reports/pnlstatement',
      openInNewTab: false
    },
    {
      title: 'Balance Sheet',
      icon: CurrencyEth,
      path: '/reports/balancesheet',
      openInNewTab: false
    },
    {
      sectionTitle: 'Automation'
    },
    {
      title: 'Analysis',
      icon: ChartTimelineVariant,
      path: '/automation/analysis',
      openInNewTab: false
    },
    {
      title: 'Rule Book',
      icon: BookSettingsOutline,
      path: '/automation/rulebook',
      openInNewTab: false
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
