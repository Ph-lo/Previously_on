const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

exports.getFriends = (req, res) => {
  // https://api.betaseries.com/episodes/unrated
  fetch("https://api.betaseries.com/friends/list", {
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
exports.getBlocked = (req, res) => {
    // https://api.betaseries.com/episodes/unrated
    fetch("https://api.betaseries.com/friends/list?blocked=true", {
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

exports.getInvites = (req, res) => {
    // https://api.betaseries.com/episodes/unrated
    fetch("https://api.betaseries.com/friends/requests?received", {
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

exports.blockFriend = (req, res) => {
    console.log(req);
    fetch("https://api.betaseries.com/friends/block", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-BetaSeries-key": process.env.CLIENT_ID,
        Authorization: "Bearer " + session.token,
      },
      body: JSON.stringify({
        id: req.query.id
      }),
    })
      .then((r) => r.json())
      .then((re) => {
        res.status(200).json(re);
      })
      .catch((err) => console.log(err));
  };

  exports.unblockFriend = (req, res) => {
    console.log(req);
    fetch("https://api.betaseries.com/friends/block?id=" + req.query.id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-BetaSeries-key": process.env.CLIENT_ID,
        Authorization: "Bearer " + session.token,
      }
    })
      .then((r) => r.json())
      .then((re) => {
        res.status(200).json(re);
      })
      .catch((err) => console.log(err));
  };

  exports.unfriend = (req, res) => {
    console.log(req);
    fetch("https://api.betaseries.com/friends/friend", {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-BetaSeries-key": process.env.CLIENT_ID,
        Authorization: "Bearer " + session.token,
      },
      body: JSON.stringify({
        id: req.query.id
      }),
    })
      .then((r) => r.json())
      .then((re) => {
        res.status(200).json(re);
      })
      .catch((err) => console.log(err));
  };

exports.acceptInvite = (req, res) => {
    console.log(req);
    fetch("https://api.betaseries.com/friends/friend", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-BetaSeries-key": process.env.CLIENT_ID,
        Authorization: "Bearer " + session.token,
      },
      body: JSON.stringify({
        id: req.query.id
      }),
    })
      .then((r) => r.json())
      .then((re) => {
        res.status(200).json(re);
      })
      .catch((err) => console.log(err));
  };

exports.getProfile = (req, res) => {
    // https://api.betaseries.com/episodes/unrated
    const tmpId = req.query.id ? "?id=" + req.query.id : '';
    fetch("https://api.betaseries.com/members/infos" + tmpId, {
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