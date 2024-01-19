import {NavLink} from 'react-router-dom'
import { useAuth } from './auth/Auth'

const AuthNavBar = () => {
    const AuthNavLinkStyles = ({isActive}) => {
        return {
            fontWeight : isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'none' : 'underline',
        }
    }

    const auth = useAuth()

    return (<nav>
        <div>ths is auth nav</div>
        <NavLink to='/profile' style={AuthNavLinkStyles}>profile</NavLink>
        {!auth.user && (<NavLink style={AuthNavLinkStyles} to='/login'>Login</NavLink>)}
    </nav>);
}
 
export default AuthNavBar;