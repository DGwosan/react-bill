import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react'
import { billTypeToName } from '@/adaptation/billListData'
import Icon from '@/icon/icon'

const DailyBill = ({date,billList}) => {
    //对当天的的数据进行处理，求支出，收入，结余（新的hook计算属性）
      const DayResult = useMemo(() => {
           const pay = billList.filter(item => item.type ==='pay').reduce((a ,c)=> a+c.money,0)
           const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
          return {
            pay,income ,total: pay+income
          }
      }, [billList])
  
    const [showDay , setShowDay] = useState(false)
  
    return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow',showDay && 'expand' )} onClick={()=>setShowDay(!showDay)}></span>
        </div>
        
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{DayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{DayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{DayResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
        
      </div>

      {/* 单日列表 */}
       <div className="billList" style={{display: showDay? 'block':'none'}}>
        {billList.map(item => {
         return (
           <div className="bill" key={item.id}>
             <Icon type={item.useFor} />
              <div className="detail">
               <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                 {item.money.toFixed(2)}
              </div>
      </div>
    )
  })}
</div>
      
    </div>
  )
}
export default DailyBill