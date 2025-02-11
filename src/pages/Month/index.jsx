import { NavBar, DatePicker } from 'antd-mobile'
import { useState, useMemo } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import dayjs from 'dayjs'

import './index.scss'
import { useSelector } from 'react-redux'

const Month = () => {
  const [visible, setVisible] = useState(false)
  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM'))
  const confirm = date => {
    setVisible(false)
    setDate(dayjs(date).format('YYYY-MM'))
  }

  const billList = useSelector(state => state.bill.billList)
  useMemo(() => {
    const newBillList = _.groupBy(billList, bill => dayjs(bill.date).format('YYYY-MM'))
    console.log(newBillList)
  }, [billList])
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backIcon={null}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text"> {date} 月账单</span>
            <span onClick={() => setVisible(true)} className={classNames('arrow', visible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            onClose={() => setVisible(false)}
            onConfirm={confirm}
            onCancel={() => setVisible(false)}
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={visible}
            max={new Date()}
          />
        </div>
      </div>
    </div>
  )
}

export default Month
