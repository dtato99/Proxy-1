const express = require("express");
const axios = require("axios");
const app = express();

app.get("/flow", async (req, res) => {
  const url = req.query.url;

  try {
    const response = await axios.get(url, {
      responseType: "stream",
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/146.0.0.0 Mobile Safari/537.36}
    });

    res.setHeader("Content-Type", response.headers["content-type"]);
    response.data.pipe(res);

  } catch (e) {
    res.status(500).send("Error proxy");
  }
});

app.listen(10000, () => console.log("OK"));
