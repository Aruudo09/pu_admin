const { comparePassword } = require("../utils/hash");

async function login(username, password) {
  const user = await userRepository.getUserByUsername(username);
  if (!user) throw new Error("User tidak ditemukan");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Password salah");

  return { message: "Login berhasil", user };
}

module.exports = { login };