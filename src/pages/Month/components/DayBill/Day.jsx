import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react'
import { billTypeToName } from '@/contants'
import Icon from '@/components/Icon'

const DailyBill = ({ dilayBillList, date }) => {
  const reduce = useMemo(() => {
    const payTotal = dilayBillList.filter(item => item.type === 'pay').reduce((a, b) => a + b.money, 0)
    const incomeTotal = dilayBillList.filter(item => item.type === 'income').reduce((a, b) => a + b.money, 0)
    return {
      payTotal,
      incomeTotal,
      total: payTotal + incomeTotal,
    }
  }, [dilayBillList])
  const [visible, setVisible] = useState(false)
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span onClick={() => setVisible(!visible)} className={classNames('arrow', visible && 'expand')}></span>
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
      {/* 单日列表 */}
      {visible && (
        <div className="billList">
          {dilayBillList.map(item => {
            return (
              <div className="bill" key={item.id}>
                <div className="detail">
                  <div className="billType">
                    <Icon type={item.useFor} />
                    {billTypeToName[item.useFor]}
                  </div>
                </div>
                <div className={classNames('money', item.type)}>{item.money}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default DailyBill
