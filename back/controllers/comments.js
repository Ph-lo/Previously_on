exports.comments = (req, res) => {
  // https://api.betaseries.com/episodes/unrated
  fetch(
    "https://api.betaseries.com/comments/comments?id=" +
      req.query.id +
      "&type=episode&nbpp=3&order=desc",
    {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-BetaSeries-key": process.env.CLIENT_ID,
        Authorization: "Bearer " + session.token,
      },
    }
  )
    .then((r) => r.json())
    .then((re) => {
      res.status(200).json(re);
    })
    .catch((err) => console.log(err));
};

exports.postComment = (req, res) => {
    console.log(req);
    fetch("https://api.betaseries.com/comments/comment", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-BetaSeries-key": process.env.CLIENT_ID,
        Authorization: "Bearer " + session.token,
      },
      body: JSON.stringify({
        id: req.body.id,
        type: "episode",
        text: req.body.text,
      }),
    })
      .then((r) => r.json())
      .then((re) => {
        res.status(200).json(re);
      })
      .catch((err) => console.log(err));
  };