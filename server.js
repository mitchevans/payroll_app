const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/api/employees');

app.use(cors());
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB 
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// use Routes
app.use('/api/employees', employeeRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production'){
    //Set Static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Server is running in Port: ${PORT}`);
})

