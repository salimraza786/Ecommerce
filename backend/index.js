const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');
require('dotenv').config()



const app = express();
app.use(cors({
   origin : process.env.FRONTEND_URL,
   credentials : true
})) 
app.use(express.json())
app.use(cookieParser())

//  routes
app.use("/api" , router)

const PORT = process.env.PORT ;


connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to MongoDb")
    console.log(`Server is running on port ${PORT}`);
  });
})
