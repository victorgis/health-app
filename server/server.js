// const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT;

connectDB();

const app = express();

//important for seeing req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/facilities', require('./routes/facilityRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../health-app/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'health-app', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));