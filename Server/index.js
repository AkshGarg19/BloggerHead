const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const path = require("path");
require('dotenv').config();

const app = express();

//Body parser Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.urlencoded({ extended: false }));

const connectDB = async() => {
  await mongoose.connect(process.env.DATABASE, {useNewUrlParser:true, useUnifiedTopology: true})
  .catch(function (error) {
    console.log(`Unable to connect to the Mongo db  ${error} `);
  });
  const con = mongoose.connection
  con.on('open', () => {
    console.log("Connected to the Database");
});
}

connectDB();

const userRoute = require('./routes/users');
app.use('/users', userRoute);

const blogRoute = require('./routes/blogs');
app.use('/blogs', blogRoute);

app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../client/build/index.html")
    );
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));