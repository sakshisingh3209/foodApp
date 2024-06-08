const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const morgan = require("morgan");

const connectDb = require('./config/db');


//import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
//rest object
const app = express();




//Db connection
connectDb();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes)

//port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.PORT} or  ${PORT}`);
})