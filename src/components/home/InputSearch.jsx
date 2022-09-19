import React from 'react'
import './styles/inputSearch.css'

const InputSearch = ({setInputSearch}) => {

  const handleChange = e => {
    setInputSearch(e.target.value.trim())
  }

  return (
    <div className='container-input-search'>
      <label className='imput-search-label'>Search</label>
      <input className='input-search' onChange={handleChange} type="text" />
    </div>
  )
}

export default InputSearch