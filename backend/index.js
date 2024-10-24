const express = require('express')
const cookieParser = require('cookie-parser');
const dbConnect=require('./utils/databaseConnect.js')
const cors = require('cors');
const userroute=require('./routes/authRoutes.js')
require('dotenv').config();

dbConnect();

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors());


app.use('/api/user', userroute);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  })

  app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
  });