import React, { useState } from 'react'
import { Badge, TabBar } from 'antd-mobile'
import { DemoBlock } from 'demos'
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

const Tabbar = () => {
  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: 'todo',
      title: '待办',
      icon: <UnorderedListOutline />,
      badge: '5',
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  const [activeKey, setActiveKey] = useState('todo')

  return (
      <DemoBlock title='基础用法' padding='0'>
        <TabBar>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </DemoBlock>
  )
}