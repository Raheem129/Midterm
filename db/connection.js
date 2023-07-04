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

const getJoinedData = function () {
  return db
    .query(`
      SELECT quizzes.id AS quiz_id, quizzes.name AS quiz_name, questions.id AS question_id, questions.question,
             answers.user_id, answers.user_answer, users.name AS user_name
      FROM quizzes
      JOIN questions ON quizzes.id = questions.quiz_id
      JOIN answers ON quizzes.id = answers.quiz_id AND questions.id = answers.question_id
      JOIN users ON quizzes.user_id = users.id;
    `)
    .then((res) => res.rows)
    .catch((err) => console.error('Query error:', err.stack));
};

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
    .catch((err) => console.error('Query error:', err.stack));
};

module.exports = { db, addUser, getJoinedData };
