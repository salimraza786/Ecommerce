const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');
require('dotenv').config()



const app = express();
// app.use(cors({
//    origin : process.env.FRONTEND_URL,
//    credentials : true
// })) 
// updated code start
const corsOptions = {
  origin: 'https://ecommerce-1-frontend-jlbl.onrender.com', // Frontend domain
  credentials: true, // Allow credentials (cookies, authentication headers)
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://ecommerce-1-frontend-jlbl.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// updated code end
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
