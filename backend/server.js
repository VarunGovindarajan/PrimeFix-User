const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appointmentsRoute = require('./routes/appoinment');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Prime-Fix');

app.use('/api/appointments', appointmentsRoute);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
