const db = require('../connection'); // Connect to the database

/**
 * Checks if a user is the owner of a quiz.
 * @param {String} userId User ID to check ownership for.
 * @param {String} quizId Quiz ID to check ownership for.
 * @return {Promise} A promise that resolves to true or false. True means the user owns the quiz, and false means they don't.
 */
const checkUserPermission = function(userId, quizId) {
  let query = `
    SELECT quizzes.id
    FROM quizzes
    WHERE user_id = $1
    AND id = $2`;

  return db.query(query, [userId, quizId])
    .then((data) => {
      if (data.rows.length) {
        return true;
      }
      return false;
    })
    .catch(error => console.log(error));
};

/**
 * Changes the privacy of a quiz.
 * @param {String} quizId ID of the quiz to change the privacy of.
 * @param {String} request If 'Private', the quiz will be made private. Otherwise, it will be made public.
 * @return {Promise}
 */
const changePrivacy = function(quizId, request) {
  const query = `
    UPDATE quizzes
    SET is_private = $1
    WHERE id = $2`;

  return db.query(query, [(request === 'Private'), quizId])
    .catch(error => console.log(error));
};

/**
 * Deletes a quiz.
 * @param {String} quizId ID of the quiz to delete.
 * @return {Promise}
 */
const deleteQuiz = function(quizId) {
  const query = `
    DELETE FROM quizzes WHERE id = $1;
    `;

  return db.query(query, [quizId])
    .catch(error => console.log(error));
};

module.exports = { checkUserPermission, changePrivacy, deleteQuiz };
