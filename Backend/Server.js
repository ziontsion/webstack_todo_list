const express = require ("express");

const mongoose = require ("mongoose");
require("dotenv").config();

const routes = require("./routes/TaskRoute");

const cors = require ("cors");
const TaskModel = require("./models/TaskModel");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err));

app.use("/api",routes);

app.listen(5000, () => { 
    console.log('Listening at 5000');
});