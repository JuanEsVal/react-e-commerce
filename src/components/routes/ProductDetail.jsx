import axios from 'axios'
import './styles/productDetail.css'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import SliderImg from '../productDetail/SliderImg'
import SimilarProducts from '../productDetail/SimilarProducts'
import ProductDescription from '../productDetail/ProductDescription'

const ProductDetail = () => {

  const [productInfo, setProductInfo] = useState()

  const { id } = useParams()

  useEffect(() => {
    const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`
    axios.get(URL)
      .then(res => setProductInfo(res.data.data.product))
      .catch(err => console.log(err))
  }, [])

  console.log(productInfo)

  return (
    <main className='product-detail'>
      <SliderImg productInfo={productInfo} />
      <ProductDescription
        productInfo={productInfo}
      />
      <section className='similar-product'>
        <h2 className='similar-product__title'>Discover similar Items</h2>
        <SimilarProducts
          productInfo={productInfo}
        />
      </section>
    </main>
  )
}

export default ProductDetail