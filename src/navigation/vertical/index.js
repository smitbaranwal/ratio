// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import { AccountDetailsOutline, BookSettingsOutline, CashCheck, ChartTimelineVariant, CurrencyEth, TextAccount } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
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
  ]
}

export default navigation
