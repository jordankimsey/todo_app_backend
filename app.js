const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Orgin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Allow-Headers', 'Content-Type, Authorization');
//   next()
// })

app.use(todoRoutes);
//app.use(error controller get 404)

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log(`App running on port ${process.env.PORT}`);
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));

  module.exports = app;

//     "headers": [
//     {
//       "source": "/(.*)",
//       "headers": [
//         { "key": "Access-Control-Allow-Credentials", "value": "true" },
//         { "key": "Access-Control-Allow-Origin", "value": "*" },
//         { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//         { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
//       ]
//     }
//   ]
