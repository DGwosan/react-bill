import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/icon/icon'
import classNames from 'classnames'
import { billListData } from '@/adaptation/billListData'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import './index.scss'
import { useState } from 'react'
import { addBillList } from '@/store/model/billStore'
import { useDispatch } from 'react-redux'
// import { v4 as uuidv4 } from 'uuid';
const New = () => {
  const navigate = useNavigate()
  const dispatch =  useDispatch()
  //进行消费和收入的切换（true为消费，false为收入）
  const [showSelect, setShowSelect] = useState(true)
  const [inputValue, setInputValue] = useState('')
  //日期选择器
  const [visible, setVisible] = useState(false)
  //获取日期
  const [SelectDate, setSelectDate] = useState(new Date().toDateString())
  //获取消费类型
  const [type ,setType] = useState('')
  //进行提交
  const saveInform = () => {
    //信息收集提示
    const data = {
      type: showSelect ? 'pay' : 'income',
      money: showSelect? -inputValue : inputValue,
      date: SelectDate,
      useFor:type
    }
     
    dispatch(addBillList(data))
  }
  
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(showSelect &&'selected')}
            onClick={()=>{setShowSelect(true)}}
          >
            支出
          </Button>
          <Button
            className={classNames(!showSelect &&'selected')}
            shape="rounded"
             onClick={()=>setShowSelect(false)}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date" onClick={()=>{setVisible(true)}}>
              <Icon type="calendar" className="icon" />
              <span className="text">{new Date().toDateString()===SelectDate? "今天" :dayjs(SelectDate).format('MM月DD日')}</span>
               
              <DatePicker
                visible={visible}
                onClose={() => {
                  setVisible(false)
                }}
                className="kaDate"
                title="记账日期"
                max={new Date()}
                onConfirm={val => {
                  setSelectDate(val.toDateString())
                }}
                
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                onChange={value => {setInputValue(value)}}
                value={inputValue}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[showSelect? 'pay':'income'].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                         type === item.type? 'selected': ''
                      )}
                      key={item.type}
                      onClick={()=>{setType(item.type)}}
                    >
                      <div className="icon">
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
        <Button className="btn save" onClick={saveInform}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New