const express = require("express");
const app = express();

const { getData } = require("./helpers");

const port = 4200;
const urlFree =
  "https://bookingportal.com/api/offerings/b80304e1-e178-4272-b7c6-af4a009599eb/bookinggrid?fromDate=2022-12-01T23%3A00%3A00.000Z&days=30";
const urlBooked =
  "https://bookingportal.com/api/offerings/b80304e1-e178-4272-b7c6-af4a009599eb/resourcebookings?from=2022-12-01T23%3A00%3A00.000Z&days=30";

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
