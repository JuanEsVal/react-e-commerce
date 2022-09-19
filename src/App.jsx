import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { getAllProducts } from './store/slices/products.slice'
import Cart from './components/routes/Cart'
import Home from './components/routes/Home'
import Login from './components/routes/Login'
import Header from './components/shared/Header'
import Purchases from './components/routes/Purchases'
import ProductDetail from './components/routes/ProductDetail'
import ProtectedRoutes from './components/routes/ProtectedRoutes'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/purchases' element={<Purchases />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
