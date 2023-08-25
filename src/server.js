const express = require("express");

const KoderRouter = require("../src/routes/koders.router");
const PracticeRouter = require("../src/routes/practice.router");

const app = express();

app.use(express.json());

app.use("/koders", KoderRouter);
app.use("/practices", PracticeRouter);

app.get("/", (request, response) => {
    response.json({
        message: "Koders APIv1"
    });
});

module.exports = app;