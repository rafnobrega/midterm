const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT *, users.name, orders.id AS order__id
    FROM orders
    JOIN users
    ON orders.user_id = users.id
    ORDER BY orders.timestamp;`
    ).then((response) => {
      let orders = response.rows;
      let templateVars = { userId: req.session.userId };
      if (req.query.json) {
        res.json(orders);
      } else {
        res.render("admin", templateVars);
      }
    });

    router.post("/", (req, res) => {
      let templateVars = { userId: req.session.userId };
      res.render("cart", templateVars);

    });


    router.post("/checkout", (req, res) => {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;

      const client = require("twilio")(accountSid, authToken);

      client.messages
        .create({
          to: process.env.MY_PHONE_NUMBER,
          from: "(931) 345-4686",
          body: "Your order is ready for pickup",
        })

        .then((message) => {
          console.log(message.sid);
          res.sendStatus(204);
        });
    });
  });

  return router;
};
