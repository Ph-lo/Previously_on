const express = require("express");
const passport = require("passport");
const authController = require("./controllers/oauth");
const showController = require("./controllers/shows");
const episodeController = require("./controllers/episodes");
const comController = require("./controllers/comments");
const memberController = require("./controllers/members");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();
const sess = require("express-session");
const app = express();

const port = process.env.PORT || 5000;

global.session = false;

app.use(express.json());

app.use(
  sess({
    secret: "secretseshduturfu",
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const isLoggedIn = (req, res, next) => {
  if (session !== false) {
    next();
  } else {
    res.status(401).json(401);
  }
};

app.get("/", isLoggedIn, (req, res) => {
  console.log("message" + req.session);
  fetch("https://api.betaseries.com/shows/discover?limit=50", {
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
});

// ###################################################################################################################################################
// ###########   OAUTH   #############################################################################################################################
// ###################################################################################################################################################
app.get("/oauth", authController.betaOauth);
app.get("/auth", authController.betaToken);


// ###################################################################################################################################################
// ###########   SHOWS   #############################################################################################################################
// ###################################################################################################################################################
app.get("/addShow", isLoggedIn, showController.addShow);
app.get("/removeShow", isLoggedIn, showController.removeShow);
app.get("/favorites", isLoggedIn, showController.favorite);
app.get("/archiveShow", isLoggedIn, showController.archiveShow);
app.get("/unarchiveShow", isLoggedIn, showController.unarchiveShow);
app.get("showDetails", isLoggedIn, showController.showDetails);


// ###################################################################################################################################################
// ###########   EPISODES   ##########################################################################################################################
// ###################################################################################################################################################
app.get("/episodes", isLoggedIn, episodeController.episodes);
app.get("/episodeDetails", isLoggedIn, episodeController.episodeDetails);
app.get("/watched", isLoggedIn, episodeController.watched);
app.get("/unmarkWatched", isLoggedIn, episodeController.unmarkWatched);
app.get("/unrated", isLoggedIn, episodeController.unrated);


// ###################################################################################################################################################
// ###########   COMMENTS   ##########################################################################################################################
// ###################################################################################################################################################
app.get("/comments", isLoggedIn, comController.comments);
app.post("/postComments", isLoggedIn, comController.postComment);


// ###################################################################################################################################################
// ###########   FRIENDS   ###########################################################################################################################
// ###################################################################################################################################################
app.get("/getFriends", isLoggedIn, memberController.getFriends);
app.get("/getBlocked", isLoggedIn, memberController.getBlocked);
app.get("/getInvites", isLoggedIn, memberController.getInvites);
app.get("/blockFriend", isLoggedIn, memberController.blockFriend);
app.get("/unblockFriend", isLoggedIn, memberController.unblockFriend);
app.get("/unfriend", isLoggedIn, memberController.unfriend);
app.get("/acceptInvite", isLoggedIn, memberController.acceptInvite);


// ###################################################################################################################################################
// ###########   PROFILE   ###########################################################################################################################
// ###################################################################################################################################################
app.get("/getProfile", isLoggedIn, memberController.getProfile);
app.get("/logout", (req, res) => {
  console.log(session.token);
  session = false;
  req.session = null;
  res.status(401).json(401);
});

app.listen(port, () => console.log("server running on port " + port));
