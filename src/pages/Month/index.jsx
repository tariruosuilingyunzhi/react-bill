import { NavBar, DatePicker } from 'antd-mobile'
import { useState, useMemo, useEffect } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import dayjs from 'dayjs'
import DailyBill from './components/DayBill/Day'
import './index.scss'
import { useSelector } from 'react-redux'

const Month = () => {
  const [visible, setVisible] = useState(false)
  const billList = useSelector(state => state.bill.billList)
  const billMonthGroup = useMemo(() => {
    return _.groupBy(billList, bill => dayjs(bill.date).format('YYYY-MM'))
  }, [billList])
  const [date, setDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM')
  })
  const [curBillList, setCurBillList] = useState([])
  const confirm = xzdate => {
    setVisible(false)
    const curDate = dayjs(xzdate).format('YYYY-MM')
    setDate(curDate)
    // 根据选择的日期筛选出账单
    setCurBillList(billMonthGroup[curDate])
  }

  const reduce = useMemo(() => {
    if (curBillList == undefined) {
      return {
        payTotal: 0,
        incomeTotal: 0,
        total: 0,
      }
    } else {
      const payTotal = curBillList.filter(item => item.type === 'pay').reduce((a, b) => a + b.money, 0)
      const incomeTotal = curBillList.filter(item => item.type === 'income').reduce((a, b) => a + b.money, 0)
      return {
        payTotal,
        incomeTotal,
        total: payTotal + incomeTotal,
      }
    }
  }, [curBillList])

  useEffect(() => {
    if (billMonthGroup[dayjs().format('YYYY-MM')]) {
      setCurBillList(billMonthGroup[dayjs().format('YYYY-MM')])
    }
  }, [billMonthGroup])

  // day数据

  const dilayList = useMemo(() => {
    const dilayBillList = _.groupBy(curBillList, item => dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(dilayBillList)
    // console.log(dilayBillList, keys)
    return { dilayBillList, keys }
  })

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
              <span className="money">{reduce.payTotal}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{reduce.incomeTotal}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{reduce.total}</span>
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
        {/* 账单列表 */}
        {dilayList.keys.map(key => (
          <DailyBill key={key} dilayBillList={dilayList.dilayBillList[key]} keys={key} />
        ))}
      </div>
    </div>
  )
}

export default Month
