const { Pool } = require('pg');
const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};
const db = new Pool(dbParams);

db.connect();


const addUser = function (user) {
  return db
    .query(
      `
    INSERT INTO users(name, email, password)
    VALUES($1 ,$2, $3)
    RETURNING *;
  `,
      [user.name, user.email, user.password]
    )
    .then((res) => res.rows)
    .catch((err) => console.error("query error", err.stack));
};

//module.exports = {addUser};



module.exports = {db, addUser};
