import {Link} from 'react-router-dom'
import {NavLink} from 'react-router-dom'
 
const NavBar = () => {
    const navLinkStyles = ({isActive}) => {
        return {
            fontWeight : isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'none' : 'underline',
        }
    }
    return (<nav>
        <NavLink to='/' style={navLinkStyles}>NavHome</NavLink>
        <br />
        <NavLink to='/about' style={navLinkStyles}>NavAbout</NavLink>
        <br />
        <NavLink to='/product' style={navLinkStyles}>NavProduct</NavLink>
        <br />
        <NavLink to='/lorem' style={navLinkStyles}>NavLorem</NavLink>
        <br />
        <Link to='/'>LinkHome</Link>
        <br />
        <Link to='/about'>LinkAbout</Link>
        <br />
        {/* refresh when click */}
        <a href="/">aTagHome</a>
        <br />
        <a href="/about">aTagAbout</a>
    </nav>);
}
 
export default NavBar;