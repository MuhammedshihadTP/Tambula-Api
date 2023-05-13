const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const auth=require("./routers/auth");
const Ticket=require('./routers/ticket');
const verifyToken= require('./middlewares/auth');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", auth);
app.use("/api/ticket",verifyToken,Ticket);

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to the mongoose");
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server connected");
});
