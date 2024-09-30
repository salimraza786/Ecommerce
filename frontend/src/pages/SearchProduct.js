/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../component/VerticalCard'

const SearchProduct = () => {
  const query = useLocation()
  const [data, setData] = useState([])
  const [loading , setLoading] = useState(false)

  console.log("query" , query.search)

  const fetchProduct = async() => {
       setLoading(true)
       const response = await fetch(SummaryApi.searchProduct.url+query.search)
       const dataResponse = await response.json()
       setLoading(false)

       setData(dataResponse.data)

  }

  useEffect(() => {
      fetchProduct()
  },[query])

  return (
    <div className='container mx-auto p-4'>
         {
          loading && (
            <p className='text-lg text-center font-semibold'>Loading....</p>
          )
         }
         <p className='text-xl font-semibold my-3'>Search results : {data.length} </p>

         {
           data.length === 0 && !loading && (
             <p className='bg-white text-3xl font-semibold p-6 text-center'>No Data Found........</p>
           )
         }

         {
           data.length !==0 && !loading && (
               
                    <VerticalCard loading={loading} data={data}/>
                
           )
         }
    </div>
  )
}

export default SearchProduct
