
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //get request for profile page
  router.get('/' ,(req,res) => {
    db.query(`SELECT dishes.title, dishes_orders.dish_id,total_price,notes,orders.user_id,dishes.price,orders.tip,orders.taxes,users.name,dishes_orders.order_id,dishes_orders.quantity
    FROM dishes
    JOIN dishes_orders
    ON dishes_orders.dish_id = dishes.id
    JOIN orders
    ON orders.id = order_id
    JOIN users
    ON users.id = user_id
    WHERE orders.user_id = $1;
    `,[1]).then ((response) => {
      let users = response.rows
      let templateVars = {users};

      console.log('users', users)
      res.render('profile',templateVars);
    });
});
return router;
}