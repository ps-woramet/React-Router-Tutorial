import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth";

const RequireAuth = ({children}) => {
    
    const location = useLocation()

    const auth = useAuth()

    if(!auth.user){
        // ส่ง state pathname ไว้สำหรับเวลา login เสร็จจะกลับมาหน้านี้
        return <Navigate to='/login' state={{path: location.pathname}}/>
    }

    return (children);
}
 
export default RequireAuth;