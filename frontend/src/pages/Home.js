import React from 'react'
import CategoryList from '../component/CategoryList'
import BannerProduct from '../component/BannerProduct'
import HorigontalCardProduct from '../component/HorigontalCardProduct'
import VerticalCardProduct from '../component/VerticalCardProduct'

const Home = () => {
  return (
    <div>
       <CategoryList/>
       <BannerProduct/>

       <HorigontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
       <HorigontalCardProduct category={"watches"} heading={"Popular's Watches"}/>

       <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
       <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
       <VerticalCardProduct category={"televisions"} heading={"Telivision"}/>
       <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
       <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
       <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speaker"}/>
       <VerticalCardProduct category={"refrigerator"} heading={"Refrigarator"}/>
       <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>







    </div>
  )
}

export default Home
