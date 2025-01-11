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
const allowedOrigins = [
  'https://ecommerce-1-frontend-jlbl.onrender.com', // Your frontend origin
  'http://localhost:3001' // For local development
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Include credentials if needed (e.g., cookies, authorization headers)
}));

app.use(cors({
  origin: '*', // Allow all origins
}));

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
