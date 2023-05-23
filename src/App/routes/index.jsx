import BoardList from "../../Modules/BoardList/BoardList";
 import Login from '../../Modules/Login/Login'
 import Registration from '../../Modules/Registration/Registration'
import Confirmation from '../../Modules/Confirmation/Confirmation'
import ForgottenPassword from "../../Modules/ForgottenPassword/ForgottenPassword";
import NotFound from "../../Modules/NotFound/NotFound";
import DeskTop from './../../Modules/DeskTop/Desktop'
export const routes = [
    
   {path: '/deskTop', element: <DeskTop/>, index:true},
    {path: '/boards', element: <BoardList />, index:true},
    {path: '/', element: <Login/>, index:true},
    {path: '/registration', element: <Registration/>, index:true},
    {path: '/verify/*', element: <Confirmation/>},
    {path: '/forgottenpassword', element: <ForgottenPassword/>},
    {path: '/*', element: <NotFound/>},

]






