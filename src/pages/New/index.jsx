import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { postBillItem } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'

const New = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [billType, setBillType] = useState('pay')
  const [value, setValue] = useState('')
  const [useFor, setUseFor] = useState('')
  // 点击保存收集表单数据
  const saveFormData = () => {
    let formData = {
      type: billType,
      money: billType === 'pay' ? -value : value,
      date: new Date(),
      useFor: useFor,
    }
    dispatch(postBillItem(formData))
    console.log(formData)
    // 重置表单
    formData = {
      type: '',
      money: 0,
      date: '',
      useFor: '',
    }
    // 返回月账单
    navigate('/')
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate('/')}>
        记一笔
      </NavBar>
      <div className="header">
        <div className="kaType">
          <Button
            onClick={() => setBillType('pay')}
            shape="rounded"
            className={classNames(billType === 'pay' && 'selected')}
          >
            支出
          </Button>
          <Button
            onClick={() => setBillType('income')}
            className={classNames(billType === 'income' && 'selected')}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{'今天'}</span>
              <DatePicker className="kaDate" title="记账日期" max={new Date()} />
            </div>
            <div className="kaInput">
              <Input
                onChange={value => {
                  setValue(+value)
                }}
                className="input"
                placeholder="0.00"
                type="number"
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div className={classNames('item', '')} key={item.type}>
                      <div onClick={() => setUseFor(item.type)} className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button onClick={saveFormData} className="btn save">
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New
