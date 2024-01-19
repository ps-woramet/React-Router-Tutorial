import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NavBar from './components/NavBar'
import OrderSummaryPage from './pages/OrderSummaryPage'
import NoMatchPage from './pages/NoMatchPage'
import ProductPage from './pages/ProductPage'
import FeaturedProducts from './components/product/FeaturedProducts'
import NewProducts from './components/product/NewProducts'
import UserPage from './pages/UserPage'
import Hello from './components/user/Hello'
import UserDetails from './components/user/UserDetails'

// Lazy Loading
import React from 'react'
const LazyLoremPage = React.lazy(() => import('./pages/LoremPage'))

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
        <NavBar/>
        <AuthNavBar/>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/about' element={<AboutPage/>}></Route>
          <Route path='/order-summary' element={<OrderSummaryPage/>}></Route>
          
          {/* Lazy Loading */}
          <Route path='lorem' 
            element={
              <React.Suspense fallback='Loading...'>
                  <LazyLoremPage/>
              </React.Suspense>
            }>
          </Route>
          
          {/* Nested route */}
          <Route path='/product' element={<ProductPage/>}>
            {/* หน้าแรกของ nested route */}
            <Route index element={<FeaturedProducts/>}/>
            <Route path='featured' element={<FeaturedProducts/>}/>
            <Route path='new' element={<NewProducts/>}/>
          </Route>
          
          {/* Dynamic route */}
          <Route path='users' element={<UserPage/>}>
            {/* user/1 */}
            {/* user/2 */}
            {/* user/3 */}
            <Route path=':userId' element={<UserDetails/>}/>
            <Route path='hello' element={<Hello/>}/>
          </Route>
    
          {/* No match route */}
          <Route path='/*' element={<NoMatchPage/>}></Route>
            
          {/* Authentication and protected routes */}
          <Route path='profile' element={<RequireAuth><ProfilePage/></RequireAuth>} />
          <Route path='login' element={<LoginPage/>} />
        
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
