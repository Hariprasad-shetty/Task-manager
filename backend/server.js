const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Mongodb connected")).catch(err=>console.log(err));

app.use('/api/tasks', taskRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));
