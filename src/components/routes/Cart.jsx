import './styles/cart.css'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import ProductCartInfo from '../cart/ProductCartInfo'
import React, { useEffect, useState } from 'react'

const Cart = () => {

  const [cartProducts, setCartProducts] = useState()
  const [totalPrice, setTotalPrice] = useState()

  const getAllProductsCart = () => {
    const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/cart'
    axios.get(URL, getConfig())
      .then(res => {
        const products = res.data.data.cart.products
        setCartProducts(products)
        // Cálculo del total de toda la cart
        const total = products.reduce((acc, cv) => {
          return Number(cv.price) * cv.productsInCart.quantity + acc
        }, 0)
        setTotalPrice(total)
      })
      .catch(err => setCartProducts())
  }

  useEffect(() => {
    getAllProductsCart()
  }, [])

  const handleCheckout = () => {
    const URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/purchases'
    const obj = {
      street: "Santander Avenue",
      colony: "Caldas",
      zipCode: 170001,
      city: "COLOMBIA",
      references: "Manizales"
    }
    axios.post(URL, obj, getConfig())
      .then(res => {
        console.log(res.data)
        getAllProductsCart()
        setTotalPrice(0)
      })
      .catch(err => console.log(err))
  }

  console.log(cartProducts)

  return (
    <section className='cart'>
      <h2 className='cart__title'>Cart</h2>
      <div className='cart__container-item'>
        {
          cartProducts?.map(product => (
            <ProductCartInfo
              key={product.id}
              product={product}
              getAllProductsCart={getAllProductsCart}
            />
          ))
        }
      </div>
      <hr className='cart__hr' />
      <footer className='cart__footer'>
        <span className='cart__total-global-label'>Total:</span>
        <p className='cart__total-global-value'>{totalPrice}</p>
        <button onClick={handleCheckout} className='cart__btn'>Checkout</button>
      </footer>
    </section>
  )
}

export default Cart