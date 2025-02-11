import { Button } from 'antd-mobile'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getBillList } from '@/store/modules/billStore'
const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])
  return (
    <>
      <Outlet />
      <div>我是layout</div>
      <Button color="primary">全局测试</Button>
      <div className="puple">
        <Button color="primary">局部测试</Button>
      </div>
    </>
  )
}
export default Layout
