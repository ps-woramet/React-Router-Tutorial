import { useState } from "react";
import { useAuth } from "../components/auth/Auth";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
   
    const [user, setUser] = useState('')
    const auth = useAuth()

    const navigate = useNavigate()

    const location = useLocation()

    // redirect ไปหน้าที่เข้าก่อนจะ login มา
    const redirectPath = location.state?.path || '/'

    const handleLogin = () => {
        auth.login(user)
        navigate(redirectPath, {replace: true})
    }

    return (<div>
        <label>
            username:
            <input type="text" onChange={(e) => setUser(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
    </div> );
}
 
export default LoginPage;