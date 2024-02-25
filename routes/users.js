var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");

require("../models/connection");
const User = require("../models/users");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

// signup de la page login
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  //Permet le hashage du mdp (à laisser dans la fonction)
  const hash = bcrypt.hashSync(req.body.password, 10);

  User.findOne({ username: req.body.username.toLowerCase() }).then((data) => {
    if (data === null) {
      const newUser = new User({
        username: req.body.username,
        password: hash,
        token: uid2(32),
      });
      newUser.save().then((data) => {
        const newUserWithoutPassword = {
          username: data.username,
          token: data.token,
        };
        res.json({ result: true, newUser: newUserWithoutPassword });
      });
    } else {
      res.json({ result: false, error: "Utilisateur déjà existant ! Merci de changer de nom." });
    }
  });
});

// signin de la page login
router.post("/signin", (req, res) => {
  console.log(req.body.username, req.body.password);
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  const hash = bcrypt.hashSync(req.body.password, 10);
  // si la valeur existe dans la BDD, le result est true
  User.findOne({ username: req.body.username }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      console.log("ok");
      res.json({
        result: true, newUser: {
          username: data.username,
          token: data.token,
        }

      });
    } else {
      res.json({ result: false, error: "Utilisateur introuvable" });
    }
  });
});

module.exports = router;
