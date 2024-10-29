const express = require('express')
const cookieParser = require('cookie-parser');
const dbConnect = require('./utils/databaseConnect.js')
const cors = require('cors');
const userroute = require('./routes/authRoutes.js')
const adminRoute = require('./routes/adminRoutes.js')
const resetPasswordRoute = require('./routes/resetPasswordRoute.js')
const lockerRoute = require('./routes/lockerRoutes.js')
const issueRoute = require('./routes/issueRoute.js')
require('dotenv').config();

dbConnect();

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173"
}));


app.use('/api/user', userroute);
app.use('/api/admin', adminRoute);
app.use('/api/resetPassword', resetPasswordRoute);
app.use('/api/locker', lockerRoute);
app.use('/api/issue', issueRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
})

app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});