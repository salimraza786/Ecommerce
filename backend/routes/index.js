const express = require("express") 
const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require("../controller/user/userSignin")
const userDetailsController = require("../controller/user/userDetails")
const authToken = require("../middlewere/authToken")
const userLogout = require("../controller/user/userLogout")
const AllUser = require("../controller/user/AllUser")
const updateUser = require("../controller/user/updateUser")
const uploadProductController = require("../controller/product/uploadProduct")
const getProductController = require("../controller/product/getProduct")
const updateProductController = require("../controller/product/updateProduct")
const getCategoryProduct = require("../controller/product/getCategoryProductOne")
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct")
const getProductDetails = require("../controller/product/getProductDetails")
const addToCartController = require("../controller/user/addToCartController")
const countAddToCartProduct = require("../controller/user/countAddToCartProduct")
const addToCartViewProduct = require("../controller/user/addToCartViewProduct")
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct")
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct")
const searchProduct = require("../controller/product/searchProduct")
const filterProductController = require("../controller/product/filterProduct")

const router = express.Router()

router.post("/signup" , userSignUpController)
router.post("/signin" , userSignInController)
router.get("/user-details" ,authToken, userDetailsController)
router.get("/userLogout" , userLogout)

// admin pannel
router.get("/all-user",authToken , AllUser)
router.post("/update-user" ,authToken , updateUser)


// product
router.post("/upload-product" ,authToken, uploadProductController)
router.get("/get-product" , getProductController)
router.post("/update-product" ,authToken , updateProductController)
router.get("/get-categoryProduct" , getCategoryProduct)
router.post("/category-product" , getCategoryWiseProduct)
router.post("/product-details" , getProductDetails)
router.get("/search" ,searchProduct)
router.post("/filter-product",filterProductController)

// user add to cart
router.post("/addtocart" ,authToken, addToCartController)
router.get("/countAddToCartProduct" ,authToken, countAddToCartProduct)
router.get("/view-cart-product" , authToken , addToCartViewProduct)
router.post("/update-cart-product" ,authToken, updateAddToCartProduct)
router.post("/delete-cart-product",authToken, deleteAddToCartProduct)

module.exports = router