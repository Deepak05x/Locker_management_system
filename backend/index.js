const express = require('express')
const cookieParser = require('cookie-parser');
const dbConnect = require('./utils/databaseConnect.js')
const cors = require('cors');
const userroute = require('./routes/authRoutes.js')
const adminRoute = require('./routes/adminRoutes.js')
const resetPasswordRoute = require('./routes/resetPasswordRoute.js')
const lockerRoute = require('./routes/lockerRoutes.js')
const issueRoute = require('./routes/issueRoute.js')
const profileRoute = require('./routes/profileRoutes.js')
require('dotenv').config();
const cron = require('node-cron');
const Locker = require('./models/lockerModel.js')

dbConnect();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173"
}));


app.use('/api/user', userroute);
app.use('/api/admin', adminRoute);
app.use('/api/resetPassword', resetPasswordRoute);
app.use('/api/locker', lockerRoute);
app.use('/api/issue', issueRoute);
app.use('/api/profile', profileRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
})

app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});


cron.schedule('0 * * * *', async () => {    // will run every hour
// cron.schedule('0 0 * * *', async () => {   // will run every midnight
  try {
     
    const result = await Locker.updateMany(
          { expiresOn: { $lte: new Date() }, LockerStatus: { $ne: "expired" } },
          { LockerStatus: "expired" }
      );
      console.log(result);
      console.log(`Expired lockers updated: ${result.nModified}`);
  } catch (err) {
      console.error(`Error updating expired lockers: ${err.message}`);
  }
});