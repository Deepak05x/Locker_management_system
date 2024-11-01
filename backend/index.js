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
const multer = require('multer');
const XLSX = require('xlsx');
 
const app = express();
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage: multer.memoryStorage() });

 
const COLUMN_MAPPING = {
  0:  "LockerType",
  1: "LockerNumber",
  2:  "LockerCode", 
  3: "LockerPrice3Month",
  4: "LockerPrice6Month",
  5:  "LockerPrice12Month",
  6:   "availableForGender"
};
 
app.post('/upload-excel', upload.single('file'), (req, res) => {
  try {
      // Access the uploaded file as a buffer
      const buffer = req.file.buffer;

      // Read the workbook from the buffer directly
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

      // Skip the first row
      const data = rows.slice(1).map((row) => {
          let mappedRow = {};
          row.forEach((cell, index) => {
              if (COLUMN_MAPPING[index]) {
                  mappedRow[COLUMN_MAPPING[index]] = cell;
              }
          });
          console.log(mappedRow);
          return mappedRow;
      });

      // Send the processed data as a response
      res.status(200).json({ message: "File processed successfully", data });
  } catch (err) {
      res.status(500).json({ message: `Error processing file: ${err.message}` });
  }
});
// app.post('/upload-excel', upload.single('file'), (req, res) => {
//   try {
//       const filePath = req.file.path;
//       const workbook = XLSX.readFile(filePath);
//       const sheetName = workbook.SheetNames[0];

//       // Read the sheet as a 2D array, where each row is an array of cells
//       const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

//       // Skip the first row
//       const data = rows.slice(1).map((row) => {
//           let mappedRow = {};

//           // Map each cell in the row to the corresponding column name
//           row.forEach((cell, index) => {
//               if (COLUMN_MAPPING[index]) {
//                   mappedRow[COLUMN_MAPPING[index]] = cell;
//               }
//           });
//           console.log(mappedRow);
//           return mappedRow;
//       });

//       // Send the processed data as a response
//       res.status(200).json({ message: "File processed successfully", data });
//   } catch (err) {
//       res.status(500).json({ message: `Error processing file: ${err.message}` });
//   }
// });

// app.post('/upload-excel', upload.single('file'), (req, res) => {
//     try {
//         const filePath = req.file.path;
//         const workbook = XLSX.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
 
//        const data = rows.slice(1).map((row) => {
//             let mappedRow = {};
//             row.forEach((cell, index) => {
//                 if (COLUMN_MAPPING[index]) {
//                     mappedRow[COLUMN_MAPPING[index]] = cell;
//                 }
//             });
//             console.log(mappedRow);
//             return mappedRow;
//         });
 
        
//         res.status(200).json({ message: "File processed successfully", data });
//     } catch (err) {
//         res.status(500).json({ message: `Error processing file: ${err.message}` });
//     }
// });

dbConnect();


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


cron.schedule('* * * * *', async () => {    // will run every hour
// cron.schedule('0 0 * * *', async () => {   // will run every midnight
  try {
     
    const result = await Locker.updateMany(
          { expiresOn: { $lte: new Date() }, LockerStatus: { $ne: "expired" } },
          { LockerStatus: "expired" }
      );

      // console.log(result);
      // console.log(`Expired lockers updated: ${result.nModified}`);
  } catch (err) {
      console.error(`Error updating expired lockers: ${err.message}`);
  }
});