const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

exports.addShow = (req, res) => {
  // console.log(session.token)
  fetch("https://api.betaseries.com/shows/show", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-BetaSeries-key": process.env.CLIENT_ID,
      Authorization: "Bearer " + session.token,
    },
    body: JSON.stringify({
      id: req.query.id,
    }),
  })
    .then((r) => r.json())
    .then((re) => {
      res.status(200).json("Show added to favorites !");
    })
    .catch((err) => console.log(err));
};

exports.removeShow = (req, res) => {
  fetch("https://api.betaseries.com/shows/show", {
    method: "DELETE",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-BetaSeries-key": process.env.CLIENT_ID,
      Authorization: "Bearer " + session.token,
    },
    body: JSON.stringify({
      id: req.query.id,
    }),
  })
    .then((r) => r.json())
    .then((re) => {
      res.status(200).json("Show removed from favorites !");
    })
    .catch((err) => console.log(err));
};

exports.favorite = (req, res) => {
    // https://api.betaseries.com/shows/member
    fetch("https://api.betaseries.com/shows/member", {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-BetaSeries-key": process.env.CLIENT_ID,
        Authorization: "Bearer " + session.token,
      },
    })
      .then((r) => r.json())
      .then((re) => {
        res.status(200).json(re);
      })
      .catch((err) => console.log(err));
  };

  exports.archiveShow = (req, res) => {
    fetch("https://api.betaseries.com/shows/archive", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-BetaSeries-key": process.env.CLIENT_ID,
        Authorization: "Bearer " + session.token,
      },
      body: JSON.stringify({
        id: req.query.id,
      }),
    })
      .then((r) => r.json())
      .then((re) => {
        res.status(200).json("Show archived !");
      })
      .catch((err) => console.log(err));
  };

  exports.unarchiveShow = (req, res) => {
    fetch("https://api.betaseries.com/shows/archive", {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-BetaSeries-key": process.env.CLIENT_ID,
        Authorization: "Bearer " + session.token,
      },
      body: JSON.stringify({
        id: req.query.id,
      }),
    })
      .then((r) => r.json())
      .then((re) => {
        res.status(200).json("Show removed from archives !");
      })
      .catch((err) => console.log(err));
  };

  exports.showDetails =  (req, res) => {
    fetch("https://api.betaseries.com/shows/display?id=" + req.query.id, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-BetaSeries-key": process.env.CLIENT_ID,
        Authorization: "Bearer " + session.token,
      },
    })
      .then((r) => r.json())
      .then((re) => {
        res.status(200).json(re);
      })
      .catch((err) => console.log(err));
  };