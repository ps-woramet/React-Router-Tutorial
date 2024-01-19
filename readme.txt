0. วิธีการ
    -สร้าง route
    -หาวิธีไป route ต่างๆ
        -สร้าง link (Link[ตรวจสอบสถานะไม่ได้], NavLink[ตรวจสอบสถานะได้], a tag[refresh website])
        -ใช้ useNavigate() เมื่อต้องการไป route อื่น หลังดำเนินการ function เสร็จ
    -สร้าง route สำหรับ page not found 
    -ทำ route ที่ซ้อนกัน nested route (สำหรับ nested route ไม่ต้องใส่ '/' เพราะการใส่ '/' หน้า path ต่างๆ จะทำให้ route คิดจาก root path)
        (สร้าง route ซ้อนใน App.jsx)
        (ใช้คำสั่ง outlet ใน page ที่ต้องการทำ nested route เพื่อแสดง component ของ route ที่ซ้อนอยู่)
        (ใช้คำสั่ง<Route index element={<FeaturedProducts/>}/>เพื่อกำหนดหน้าเริ่มต้นของ nested route)
    -ทำ dynamic route
        (สร้าง route ซ้อนใน App.jsx)
        (สร้าง dynamic route เป็น route ซ้อน <Route path=':userId' element={<UserDetails/>}/> ใน App.jsx)
        (ใช้คำสั่ง outlet ใน page(UserPage.jsx) ที่ต้องการทำ nested route เพื่อแสดง component ของ route ที่ซ้อนอยู่)
        (ใช้คำสั่ง useParams ใน nested route(UserDetails.jsx) เพื่อรับ path ของ dynamic route)
    -search params
        -ใช้ hook useSearchParams
    -ทำ lazy loading
        (ใช้คำสั่ง React.lazy ใน app.jsx) ตัวอย่าง const LazyLoremPage = React.lazy(() => import('./pages/LoremPage'))
        (สร้าง route โดยใช้ React.Suspense) <Route path='lorem' element={<React.Suspense fallback='Loading...'><LazyLoremPage/></React.Suspense>}></Route>
    -ทำ Authentication and Protect route
        (สร้าง component AuthProvider ใน auth.jsx เป็น tag คู่ คอยรับ children มาเพื่อทำการส่งค่า state user ด้วย context)
        (จำลองการสร้าง state user ด้วย Createcontext, function login,function logout ใน component AuthProvider และสร้าง hook useContext ไว้เตรียมใช้ ใน auth)
        (สร้าง component requireAuth เป็น tag คู่ สำหรับทำ protect route โดยมีคำสั่ง useLocation สำหรับส่ง state pathname หน้าปัจจุบันไปหน้า login จากนั้นเวลา login เสร็จจะทำการ redirect มาหน้าตาม pathname)
        (สร้างหน้า login, profile)
        (สร้าง navbar ใน AuthNavBar เช็คเงือนไขหากมีการ login ให้ navlink login หาย)
        (สร้าง route ใน App.jsx และ ครอบ route ทั้งหมดด้วย AuthProvider เพื่อส่งค่า state user ได้)
        (นำ requireAuth มาครอบ route ที่ต้องการ)

1. install react-router-dom

    npm i react-router-dom

2. clear App.css, index.css, App.jsx

3. config routes ที่หน้า index.js โดยการใช้ <BrowserRouter>

    -src > main.jsx
        import React from 'react'
        import ReactDOM from 'react-dom/client'
        import App from './App.jsx'
        import './index.css'
        import {BrowserRouter} from 'react-router-dom'

        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>,
        )

4. การสร้าง route ที่ไฟล์ App.js

    -src > pages > AboutPage.jsx ทำการสร้าง page
    -src > pages > HomePage.jsx ทำการสร้าง page

    -src > index.jsx

        import './App.css'
        import {Routes, Route} from 'react-router-dom'
        import HomePage from './pages/HomePage'
        import AboutPage from './pages/AboutPage'
        function App() {

        return (
            <>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/about' element={<AboutPage/>}></Route>
                </Routes>
            </>
        )
        }

        export default App

5. สร้าง Link ไว้กดไป route ต่างๆ

    1. tag a จะเกิดการ refresh website
    2. tag Link กดเพื่อไปหน้าต่างๆ แต่ไม่สามารถตรวจสอบการ active ได้
    3. tag NavLink กดเพื่อไปหน้าต่างๆ แต่สามารถตรวจสอบการ active ได้
    4. function useNavigate การนำทางที่ไม่ได้มาจากการคลิกที่ลิงก์ หรือ การนำทางหลังจากการดำเนินการต่างๆ

    ตัวอย่าง การตรวจสอบ active ของ NavLink
    -index.css
        nav a.active{
            text-decoration: none;
            font-weight: bold;
        }

    -การใช้ link

        -src > NavBar.jsx

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

        -src > App.jsx ทำการเรียก component NavBar

            import './App.css'
            import {Routes, Route} from 'react-router-dom'
            import HomePage from './pages/HomePage'
            import AboutPage from './pages/AboutPage'
            import NavBar from './components/NavBar'
            function App() {

            return (
                <>
                <NavBar/>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/about' element={<AboutPage/>}></Route>
                </Routes>
                </>
            )
            }

            export default App
    
    -การใช้  useNavigate การนำทางที่ไม่ได้มาจากการคลิกที่ลิงก์ หรือ การนำทางหลังจากการดำเนินการต่างๆ

        -src > pages > Home.jsx

            import { useNavigate } from "react-router-dom";

            const HomePage = () => {

                const navigate = useNavigate()

                return <>
                <div>Home Page</div>
                <button onClick={() => navigate('order-summary', {replace: true})}>Place Order</button>
                </>
            }
            
            export default HomePage;


        -src > pages > OrderSummaryPage.jsx

            import { useNavigate } from "react-router-dom";

            const OrderSummaryPage = () => {
                const navigate = useNavigate()
                return <>
                <div>this is order summary page</div>
                <button onClick={() => navigate(-1)}>Go back</button>
                </>;
            }
            
            export default OrderSummaryPage;

        -src > App.jsx ทำการ import page ordersummaryPage

            import './App.css'
            import {Routes, Route} from 'react-router-dom'
            import HomePage from './pages/HomePage'
            import AboutPage from './pages/AboutPage'
            import NavBar from './components/NavBar'
            import OrderSummaryPage from './pages/OrderSummaryPage'

            function App() {

            return (
                <>
                <NavBar/>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/about' element={<AboutPage/>}></Route>
                    <Route path='/order-summary' element={<OrderSummaryPage/>}></Route>
                </Routes>
                </>
            )
            }

            export default App

6. สร้าง route สำหรับ page not found

    -src > pages > NoMatch.jsx

        const NoMatch = () => {
            return <div>This is 404 Page</div>;
        }
        
        export default NoMatch;

    -src > App.jsx ทำการเพิ่ม <Route path='/*' element={<NoMatchPage/>}></Route>

        import './App.css'
        import {Routes, Route} from 'react-router-dom'
        import HomePage from './pages/HomePage'
        import AboutPage from './pages/AboutPage'
        import NavBar from './components/NavBar'
        import OrderSummaryPage from './pages/OrderSummaryPage'
        import NoMatchPage from './pages/NoMatchPage'

        function App() {

        return (
            <>
            <NavBar/>
            <Routes>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/about' element={<AboutPage/>}></Route>
                <Route path='/order-summary' element={<OrderSummaryPage/>}></Route>
                <Route path='/*' element={<Page/>}></Route>
            </Routes>
            </>
        )
        }

        export default App

7. สร้าง nested route ใน ProductPage

    -src > components > product > FeaturedProducts, NewProducts
    //ทำการสร้าง components หน้าย่อยต่างๆ เพื่อทำ nested route
    
    -src > NavBar.jsx สร้าง NavLink เพื่อหาวิธีไป route ProductPage

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
                <NavLink to='/product' style={navLinkStyles}>NavProduct</NavLink>
            </nav>);
        }
        
        export default NavBar;

    -src > app.jsx เพิ่ม route ไป productPage

        import './App.css'
        import {Routes, Route} from 'react-router-dom'
        import ProductPage from './pages/ProductPage'
        import FeaturedProducts from './components/product/FeaturedProducts'
        import NewProducts from './components/product/NewProducts'

        function App() {

        return (
            <>
            <NavBar/>
            <Routes>
                <Route path='/product' element={<ProductPage/>}>
                    {/* หน้าแรกของ nested route */}
                    <Route index element={<FeaturedProducts/>}/>
                    <Route path='featured' element={<FeaturedProducts/>}/>
                    <Route path='new' element={<NewProducts/>}/>
                </Route>
            </Routes>
            </>
        )
        }

        export default App

    -สร้าง nested route ที่หน้า productPage

        import { Link, Outlet } from "react-router-dom";

        const ProductPage = () => {
            return (<>
            <div>
                <input type="search" placeholder="Search products"/>
            </div>
            <nav>
                <Link to='Featured'>Featured</Link>
                <Link to='new'>new</Link>
            </nav>
            {/* Outlet จะแสดงคอมโพเนนต์ที่เกี่ยวข้องกับเส้นทางนี้ */}
            <Outlet/>
            </>)
        }
        
        export default ProductPage;

8. สร้าง Dynamic route

    -src > pages > userPage.jsx ทำการใช้คำสั่ง outlet เพื่อแสดง nested route

        import { Outlet } from "react-router-dom";
        const UserPage = () => {
            return (<div>
                this is userPage show user1, user2, user3
                <Outlet/>
            </div>);
        }
        
        export default UserPage;

    -src > components > product > Hello.jsx, UserDetails.jsx
    //ทำการสร้าง components หน้าซ้อนต่างๆ เพื่อทำ nested route ของ userPage

        -src > components > user > Hello.jsx

            const Hello = () => {
                return <div>this is hello page</div>;
            }
            
            export default Hello;

        -src > components > user > UserDetails.jsx รับค่า path ของ dynamic route ด้วย useParams

            import {useParams} from 'react-router-dom'

            const UserDetails = () => {
                const params = useParams()
                const userId = params.userId
                return <div>details about user {userId}</div>;
            }
            
            export default UserDetails;

    src > app.jsx สร้าง dynamic route

        {/* Dynamic route */}
        <Route path='users' element={<UserPage/>}>
            {/* users/1 */}
            {/* users/2 */}
            {/* users/3 */}
            <Route path=':userId' element={<UserDetails/>}/>
            <Route path='hello' element={<Hello/>}/>
        </Route>

9. Search params

    src > pages > UserPage.jsx

        import { Outlet, useSearchParams } from "react-router-dom";

        const UserPage = () => {
            // hook สำหรับ params ใน url
            const [searchParams, setSearchParams] = useSearchParams()
            
            // check condition ของ searchParams
            const showActiveUsers = searchParams.get('filter') === 'active'

            return (<div>
                this is userPage show user1, user2, user3
                <Outlet/>
                {/* set parameter */}
                <div>
                    <button onClick={() => setSearchParams({filter: 'active'})}>Active User</button>
                    <button onClick={() => setSearchParams({})}>Reset User</button>
                </div>
                {showActiveUsers ?(<h2>Showing active users</h2>):(<h2>Showing all users</h2>)}
                </div>);
        }
        
        export default UserPage;

10. Layz loading

    -src > app.jsx

        import React from 'react'
        const LazyLoremPage = React.lazy(() => import('./pages/LoremPage'))

        function App() {

        return (
            <>
            <NavBar/>
            <Routes> 
                {/* Lazy Loading */}
                <Route path='lorem' 
                element={
                    <React.Suspense fallback='Loading...'>
                        <LazyLoremPage/>
                    </React.Suspense>
                }>
                </Route>
            </Routes>
            </>
        )
        }

        export default App

11. ทำ Authentication and Protect route
        (สร้าง component AuthProvider ใน auth.jsx เป็น tag คู่ คอยรับ children มาเพื่อทำการส่งค่า state user ด้วย context)
        (จำลองการสร้าง state user ด้วย Createcontext, function login,function logout ใน component AuthProvider และสร้าง hook useContext ไว้เตรียมใช้ ใน auth)
        (สร้าง component requireAuth เป็น tag คู่ สำหรับทำ protect route โดยมีคำสั่ง useLocation สำหรับส่ง state pathname หน้าปัจจุบันไปหน้า login จากนั้นเวลา login เสร็จจะทำการ redirect มาหน้าตาม pathname)
        (สร้างหน้า login, profile)
        (สร้าง navbar ใน AuthNavBar เช็คเงือนไขหากมีการ login แล้ว ให้ navlink login หาย)
        (สร้าง route ใน App.jsx และ ครอบ route ทั้งหมดด้วย AuthProvider เพื่อส่งค่า state user ได้)
        (นำ requireAuth มาครอบ route ที่ต้องการ)

    -src > components > auth > Auth.jsx

        import { useState, createContext, useContext } from "react";

        const AuthContext = createContext(null)

        export const AuthProvider = ({children}) => {
            const [user, setUser] = useState(null)

            const login = (user) => {
                setUser(user)
            }

            const logout = () => {
                setUser(null)
            }

            return(
                <AuthContext.Provider value={({user, login, logout})}>
                    {children}
                </AuthContext.Provider>
            )
        }

        export const useAuth = () => {
            return useContext(AuthContext)
        }

    -src > components > auth > RequireAuth.jsx

        import { Navigate, useLocation } from "react-router-dom";
        import { useAuth } from "./Auth";

        const RequireAuth = ({children}) => {
            
            const location = useLocation()

            const auth = useAuth()

            if(!auth.user){
                // ส่ง state pathname
                return <Navigate to='/login' state={{path: location.pathname}}/>
            }

            return (children);
        }
        
        export default RequireAuth;

    -src > pages > LoginPage.jsx

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
    
    -src > pages > ProfilePage.jsx

        import { useNavigate } from "react-router-dom";
        import { useAuth } from '../components/auth/Auth'

        const ProfilePage = () => {
            
            const auth = useAuth()

            const navigate = useNavigate()

            const handleLogout = () => {
                auth.logout()
                navigate('/')
            }

            return (<div>Welcom {auth.user}
                <button onClick={handleLogout}>Logout</button>
            </div>);
        }
        
        export default ProfilePage;

    -src > components > AuthNavBar.jsx

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

    -src > App.jsx

        import {Routes, Route} from 'react-router-dom'

        // Auth and Protected Routes
        import AuthNavBar from './components/AuthNavBar'
        import ProfilePage from './pages/ProfilePage'
        import LoginPage from './pages/LoginPage'
        import { AuthProvider } from './components/auth/Auth'
        import RequireAuth from './components/auth/RequireAuth'

        function App() {

        return (
            <>
            <AuthProvider>
                <AuthNavBar/>
                    <Routes>
                    
                        {/* Authentication and protected routes */}
                        <Route path='profile' element={<RequireAuth><ProfilePage/></RequireAuth>} />
                        <Route path='login' element={<LoginPage/>} />
                    
                    </Routes>
            </AuthProvider>
            </>
        )
        }

        export default App