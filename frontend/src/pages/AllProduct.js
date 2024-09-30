import React, { useEffect, useState } from 'react'
import UploadProduct from '../component/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../component/AdminProductCard'

const AllProduct = () => {
  const [openUploadProduct , setOpenUploadProduct] = useState(false)
  const [allProduct , setAllProduct] = useState([])

  const fetchAllProduct = async () => {
     const response = await fetch(SummaryApi.allProduct.url)

     const dataResponse = await response.json()

     setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
     fetchAllProduct()
  } ,[])

  return (
    <div>
       <div className='bg-white py-2 px-4 flex items-center justify-between'>
         <h2 className='font-bold text-lg'>All Product</h2>
         <button className=' border-2 border-red-600 text-red-600 hover:bg-red-500 hover:text-white transition-all rounded-full py-1 px-3' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
       </div>

       {/* all product */}

       <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll '>
         {
          allProduct.map((product , index) => {
            return (
              <AdminProductCard data = {product} key = {index+"allProduct"} fetchData = {fetchAllProduct}/>               
            )
          })
         }
       </div>


       {/* upload product component */}

       {
        openUploadProduct && (
          <UploadProduct onClose={() =>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
       }
    </div>
  )
}

export default AllProduct

