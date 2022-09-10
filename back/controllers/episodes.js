const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

exports.episodes = (req, res) => {
  fetch("https://api.betaseries.com/episodes/list?showId=" + req.query.id, {
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

exports.episodeDetails = (req, res) => {
  fetch("https://api.betaseries.com/episodes/display?id=" + req.query.id, {
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

exports.watched = (req, res) => {
  fetch("https://api.betaseries.com/episodes/watched", {
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
      bulk: req.query.bulk,
    }),
  })
    .then((r) => r.json())
    .then((re) => {
      res.status(200).json("Marked as seen !");
    })
    .catch((err) => console.log(err));
};

exports.unmarkWatched = (req, res) => {
  fetch("https://api.betaseries.com/episodes/watched", {
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
      res.status(200).json("Show marked as not seen !");
    })
    .catch((err) => console.log(err));
};

exports.unrated = (req, res) => {
  // https://api.betaseries.com/episodes/unrated
  fetch("https://api.betaseries.com/episodes/unrated", {
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
