const express = require("express");
const app = express();
require("dotenv").config({ path: "./.env" });

const urlFree = process.env.URL_FREE_SLOTS;
const urlBooked = process.env.URL_BOOKED_SLOTS;
const port = process.env.PORT

const { getData } = require("./helpers");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  getData(urlFree, urlBooked).then((data) => {
    try {
      res.status(200).json(data);
    } catch (error) {
      res
        .status(404)
        .json({ message: "Can't find the available slots", error });
    }
  });
});

app.listen(port);
