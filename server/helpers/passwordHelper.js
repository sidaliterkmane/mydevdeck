const crypto = require("crypto");

/**
 * Generates a random temporary password.
 *
 * @param {number} length - The length of the password to generate. Defaults to 12.
 * @returns {string} - A randomly generated password.
 */
const generateTemporaryPassword = (length = 12) => {
  // Character set including uppercase, lowercase letters, digits, and special characters
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&?";
  let password = "";

  const randomBytes = crypto.randomBytes(length);

  // Loop through each byte in the randomBytes buffer
  for (let i = 0; i < length; i++) {
    password += charset[randomBytes[i] % charset.length];
  }

  return password;
};

module.exports = {
  generateTemporaryPassword,
};
