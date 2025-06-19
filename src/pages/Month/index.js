import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import classNames from 'classname'
import { useSelector } from 'react-redux'
import DailyBill from '@/components/DayBill'
import _ from 'lodash'
const Month = () => {
  //获取store中的所有账单数据
  const { billList } = useSelector(state => state.bills)
  //对初始数据进行处理（月份分组，以及当前月入currentMonthBillList）对原数据的处理新的hook
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item)=>dayjs(item.date).format("YYYY年MM月"))
  }, [billList])
  //初始化的数据渲染
  useEffect(() => {
    //查询当前月的数组key值
    const time = dayjs(new Date()).format("YYYY年MM月")
    //将数数据放入currentMonthBillList
    if (monthGroup[time]) {
       setCurrentMonthBillList(monthGroup[time])
    }
  },[monthGroup])
  //保存一个状态切换时间选择框
  const [showTime, setShowTime] = useState(false)
  //保存一个时间，初始值是当前时间
  const [currentTime, setCurrentTime] = useState(() => {
    return dayjs(new Date()).format("YYYY年MM月")
  })
  //当前月的账单列表(也有初始值)
  const [currentMonthBillList,setCurrentMonthBillList] = useState([])

  //点击确定时候触发data可以获取我们选择的时间
  const onConfirmTimeSelect = (date) => {
    //关闭弹窗
    setShowTime(false)
    //将获取的时间渲染到左上角
    const time = dayjs(date).format("YYYY年MM月")
    setCurrentTime(time)
    //过滤出当前月份的所以账单并且存到currentMonthBillList
    if (monthGroup[time]) {
       setCurrentMonthBillList(monthGroup[time])
    }
  }

   //对当前月份的数据进行处理，求支出，收入，结余（新的hook计算属性）
  const monthResult = useMemo(() => {
       const pay = currentMonthBillList.filter(item => item.type ==='pay').reduce((a ,c)=> a+c.money,0)
       const income = currentMonthBillList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
      return {
        pay,income ,total: pay+income
      }
  }, [currentMonthBillList])
  

  //当前月数据按照日来分组
  const dayGroup = useMemo(() => {
    const groupDate = _.groupBy(currentMonthBillList, (item) => dayjs(item.date).format("YYYY年MM月DD日"))
    const keys= Object.keys(groupDate)
    return {groupDate,keys}
  }, [currentMonthBillList])

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date"  onClick={()=>setShowTime(true)}>
            <span className="text">
              {currentTime+''}账单
            </span>
            <span className ={classNames('arrow',showTime && 'expand' )}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={showTime}
            max={new Date()}
            onClose={() => setShowTime(false)}
            onConfirm={onConfirmTimeSelect}
          />
        </div>

        {/* 列表模板单日列表统计 */}
        {dayGroup.keys.map(key => {
          return <DailyBill key={key} date={key} billList={dayGroup.groupDate[key]}  />
        })}
      </div>
    </div >
  )
}

export default Month