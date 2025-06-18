import React, { useEffect, useState } from 'react'
import {  TabBar } from 'antd-mobile'
import './index.scss'
import {Outlet, useNavigate} from 'react-router-dom'
import {
    AppOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
import { useDispatch } from 'react-redux'
import { fetchBill } from '@/store/model/billStore'

const Layout = () => {
   const dispatch = useDispatch()
   //bill数据请求
    useEffect(()=>{
      dispatch(fetchBill())
    },[dispatch])
   //路由跳转方法
   const navigate =  useNavigate()
   //tabar信息配置
    const tabs = [
        {
            key: '/month',
            title: '月度账单',
            icon: <AppOutline />,
        },
        {
            key: '/new',
            title: '记账',
            icon: <UnorderedListOutline />,
        },
        {
            key: '/year',
            title: '年度账单',
            icon: <UserOutline />,
        },
    ]

    const setRouteActive = (path)=>{
       navigate(path)
    }

    return (
        <div className='layout'>
            <div className='container'>
              <Outlet/>
            </div>
            <div className='footer'>
                <TabBar onChange={value => setRouteActive(value)}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>

        </div>
    )
}


export default Layout