import { TabBar } from 'antd-mobile'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBillList } from '@/store/modules/billStore'
import './index.scss'
import { BillOutline, CalculatorOutline, AddCircleOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
const tabs = [
  {
    key: '/',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]

const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])
  const navigate = useNavigate()
  const changeRouter = path => {
    console.log(path)
    navigate(path)
  }
  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={changeRouter}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Layout
