import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'
const DailyBill = ({ dilayBillList, keys }) => {
  const reduce = useMemo(() => {
    const payTotal = dilayBillList.filter(item => item.type === 'pay').reduce((a, b) => a + b.money, 0)
    const incomeTotal = dilayBillList.filter(item => item.type === 'income').reduce((a, b) => a + b.money, 0)
    return {
      payTotal,
      incomeTotal,
      total: payTotal + incomeTotal,
    }
  }, [dilayBillList])
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{keys}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{reduce.payTotal}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{reduce.incomeTotal}</span>
          </div>
          <div className="balance">
            <span className="money">{reduce.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DailyBill
