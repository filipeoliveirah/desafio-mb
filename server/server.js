require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const registrationRoutes = require('./routes/registration');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', registrationRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});