const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

exports.betaOauth = (req, res, next) => {
  try {
    // console.log(process.env.REDIRECT_URI)
    res
      .status(301)
      .redirect(
        "https://www.betaseries.com/authorize?" +
          "client_id=" +
          process.env.CLIENT_ID +
          "&redirect_uri=" +
          process.env.REDIRECT_URI
      );
  } catch (err) {
    console.log(err);
  }
};

exports.betaToken = (req, res, next) => {
  console.log(req.query.code);
  // console.log(req)
  // console.log()
  fetch("https://api.betaseries.com/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code: req.query.code,
    }),
  })
    .then((r) => r.json())
    .then((response) => {
      session = req.session;
      session.token = response.access_token;
      // console.log(req.session);
      res.redirect("http://localhost:3000/");
    })
    .catch((err) => console.log(err));
};
