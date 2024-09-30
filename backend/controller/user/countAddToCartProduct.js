const addToCartModel = require("../../models/cartProduct")

const countAddToCartProduct = async(req , res) => {
  try {
    const userId = req.userId

    const count = await addToCartModel.countDocuments({
      userId : userId
    })

    res.json({
      data : {
        count : count
      },
      message : "ok" ,
      error : false ,
      success : true
    })


  } catch (err) {
    res.status(400).json({
      message : err.message || err ,
      success : false ,
      error : true
    })
  }
}

module.exports = countAddToCartProduct