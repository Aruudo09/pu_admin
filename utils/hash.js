const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10; // Jumlah salt untuk keamanan
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
