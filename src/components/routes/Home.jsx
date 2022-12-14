import './styles/home.css'
import CardHome from '../home/CardHome'
import PriceFilter from '../home/PriceFilter'
import InputSearch from '../home/InputSearch'
import CategoryFilter from '../home/CategoryFilter'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [inputSearch, setInputSearch] = useState('')
  const [filterProducts, setfilterProducts] = useState()
  const [objFilterPrice, setObjFilterPrice] = useState({})
  const [closeFilter, setCloseFilter] = useState('close__filter')

  const products = useSelector(state => state.products)

  useEffect(() => {
    if(inputSearch.length !== 0) {
      const filter = products?.filter(e => e.title.toLowerCase().includes(inputSearch.toLowerCase()))
      setfilterProducts(filter)
    } else {
      setfilterProducts('')
    }
  }, [inputSearch])

  useEffect(() => {
    if(objFilterPrice.to || objFilterPrice.from){
      const filter = products?.filter(e => {
        const price = Number(e.price)
        const min = objFilterPrice.from
        const max = objFilterPrice.to
        if(min && max){
          return min <= price && price <= max
        } else if(min && !max){
          return min <= price
        } else if(!min && max){
          return price <= max
        } else {
          return true
        }
      })
      setfilterProducts(filter)
    } else {
      setfilterProducts('')
    }
  }, [objFilterPrice.to, objFilterPrice.from])

  const handleExitFilter = () => {
    setCloseFilter('close__filter')
  }

  const handleOpenFilter = () => {
    setCloseFilter('')
  }

  return (
    <main className='home'>
      <div className='home__input-container'>
        <InputSearch setInputSearch={setInputSearch} />
        <i onClick={handleOpenFilter} className="fa-solid fa-filter home__icon-filter"></i>
      </div>
      <div className={`home__filter-container ${closeFilter}`}>
        <i onClick={handleExitFilter} className="fa-solid fa-xmark filter__exit"></i>
        <h2 className='filter__title'>Filters</h2>
        <PriceFilter setObjFilterPrice={setObjFilterPrice} />
        <CategoryFilter />
      </div>
      <div className='home__container-card'>
        {
          filterProducts ?
            filterProducts?.map(product => (
              <CardHome 
                key={product.id}
                product={product}
              />
            ))
          :
            products?.map(product => (
              <CardHome 
                key={product.id}
                product={product}
              />
            ))
        }
      </div>
    </main>
  )
}

export default Home