require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

// const jsonServer = require('json-server');
// const middlewares = jsonServer.defaults();
const PORT = process.env.PORT;

const userRoutes = require('./router/users');
const itemRoutes = require('./router/items');

const connection = require('./database/db.js');

app.use('/', userRoutes);
//app.use('/', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
