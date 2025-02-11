import { Button } from 'antd-mobile'
import { Outlet } from 'react-router-dom'

const Layout = () => {
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
