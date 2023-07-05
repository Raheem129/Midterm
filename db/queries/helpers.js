/**
 * Generates a random alphanumeric string of the specified length. The string can include both uppercase and lowercase letters.
 * @param {Number} length The length of the random string.
 * @return {String} The randomly generated string.
 */
const generateRandomString = function(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomNumber(0, characters.length - 1);
    randomString += characters[randomIndex];
  }
  return randomString;
};

/**
 * Returns a random number between the specified minimum and maximum values, inclusive.
 * @param {Number} min The minimum number.
 * @param {Number} max The maximum number.
 * @return {Number} The random number.
 */
const getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = { generateRandomString };
