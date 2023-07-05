
const db = require('../connection'); // Connect to the database
const { generateRandomString } = require('./helpers');

/**
 * Inserts a new quiz into the database.
 * @param {Object} quiz An object representing the quiz.
 * @param {String} userId The ID of the user who created the quiz.
 * @return {Promise} Promise that resolves to an object containing the quiz's URL and results URL.
 */
const addQuiz = function(quiz, userId) {
  // Extract necessary properties from the quiz object
  const { quiz_title, quiz_description, quiz_private, questions } = quiz;

  // Generate random URLs for the quiz and results
  const url = generateRandomString(10);
  const resultsUrl = generateRandomString(10);
  const urls = { url, resultsUrl };

  // Construct the query to insert the quiz into the database
  const quizQuery = `
    INSERT INTO quizzes(user_id, title, description, url, results_url, is_private)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const queryParams = [userId, quiz_title, quiz_description, url, resultsUrl, quiz_private];

  // Insert the quiz into the database and retrieve the quiz ID
  return db.query(quizQuery, queryParams)
    .then(quizData => quizData.rows[0].id)
    .then(quizId => addQuestions(quizId, questions))
    .then(questionInfo => addAnswers(questionInfo, questions))
    .then(() => urls)
    .catch(error => console.log(error));
};

/**
 * Inserts questions for a new quiz into the database.
 * @param {String} quizId The ID of the quiz that the questions belong to.
 * @param {Object} questions An object representing the questions to insert, keyed with their sequence numbers.
 * @return {Promise} Promise that resolves to a questionInfo object with key-value pairs of question sequence num: question ID.
 * */
const addQuestions = function(quizId, questions) {
  let queryParams = [quizId];

  let query = `
    INSERT INTO questions(quiz_id, text, sequence) VALUES `;

  // Construct the query and parameters for inserting questions
  for (const seqNum in questions) {
    const text = questions[seqNum].text;
    query += ` ($1, `;
    queryParams.push(text);
    query += `$${queryParams.length}, `;
    queryParams.push(seqNum);
    query += `$${queryParams.length}),`;
  }

  query = query.slice(0, -1);
  query += ' RETURNING *';

  // Insert the questions into the database and create the questionInfo object
  return db.query(query, queryParams)
    .then(data => {
      return data.rows.reduce((questionInfo, question) => {
        questionInfo[question.sequence] = question.id;
        return questionInfo;
      }, {});
    })
    .catch(error => console.log(error));
};

/**
 * Inserts answers for a new quiz into the database.
 * @param {Object} questionInfo An object with key-value pairs of question sequence num: question ID.
 * @param {Object} questions An object representing the questions to insert, where answers are a parameter of each question.
 * @return {Promise}
 * */
const addAnswers = function(questionInfo, questions) {
  let query = `INSERT INTO answers(question_id, text, is_correct) VALUES `;
  let queryParams = [];

  // Construct the query and parameters for inserting answers
  for (const seqNum in questions) {
    const question = questions[seqNum];
    const quesId = questionInfo[seqNum];
    queryParams.push(quesId);
    const quesIdPos = queryParams.length;

    for (const ansNum in question.answers) {
      const text = question.answers[ansNum];
      const isCorrect = (ansNum === question.correct);
      query += ` ($${quesIdPos}, `;
      queryParams.push(text);
      query += `$${queryParams.length}, `;
      queryParams.push(isCorrect);
      query += `$${queryParams.length}),`;
    }
  }

  query = query.slice(0, -1);

  // Insert the answers into the database
  return db.query(query, queryParams)
    .catch(error => console.log(error));
};

module.exports = { addQuiz };
