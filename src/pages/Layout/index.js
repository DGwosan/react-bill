import { Outlet } from "react-router-dom"
import { Button } from 'antd-mobile'
const Layout = () => {
    return (
        <div>
            我是layout
             <Button color='primary'>Purple</Button>
            <Outlet/>
        </div>)
}

export default Layout