const express = require("express");
const path = require("path");
const fs = require("fs");
const port = process.env.APP_PORT || 8080;

app.get("/", function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return res.send("Invalid request");
    }
    data = data.replace(/\$OG_TITLE/g, "Zoops");
    data = data.replace(/\$OG_DESCRIPTION/g, "This is Zoops application");
    result = data.replace(
      /\$OG_IMAGE/g,
      `${process.env.SERVER_PUBLIC_URL}/images/zotalabs.png`
    );
    res.send(result);
  });
});
app.get("/admin/*", function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return res.send("Invalid request");
    }
    data = data.replace(/\$OG_TITLE/g, "Zoops");
    data = data.replace(/\$OG_DESCRIPTION/g, "This is Zoops application");
    result = data.replace(
      /\$OG_IMAGE/g,
      `${process.env.SERVER_PUBLIC_URL}/images/zotalabs.png`
    );
    res.send(result);
  });
});

app.use(express.static(path.resolve(__dirname, "./build")));

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || "3030");

app.use(function (err, req, res, next) {
  console.log("starting the dev serve");
});
app.listen(port);
module.exports = app;
