const userRepository = require("../repositories/user.repository");
const { getIO } = require("../utils/socket");
const { comparePassword } = require("../utils/hash");
const bcrypt = require("bcrypt");

async function login(username, password) {
  const user = await userRepository.getUserByUsername(username);
  if (!user) throw new Error("User tidak ditemukan");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Password salah");

  if (user.is_active !== 'Y') {
    throw new Error("Akun belum aktif. Menunggu persetujuan admin.");
  }

  // Jika kamu ingin filter hanya user web, bisa cek 'app' juga:
  // if (user.app !== 'Y') {
  //   throw new Error("Akun belum disetujui untuk akses aplikasi.");
  // }

  return { message: "Login berhasil", user };
}

async function registerUser(data) {
  const { username, fullname, password } = data;

  console.log("Registering user:", username, fullname, password);

  const existing = await userRepository.getUserByUsername(username);
  if (existing) {
    return { success: false, message: "Username sudah terdaftar" };
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser({
    username,
    fullname,
    password: hashed,
    id_level: 2, // default user
    is_active: "N",
    app: "N",
  });

  // Emit ke admin
  getIO().to("admin").emit("user_registered", {
    id: newUser.id,
    username: newUser.username,
    fullname: newUser.fullname,
    message: "User baru mendaftar dan menunggu persetujuan admin.",
  });

  return { success: true };
}

async function approveUser(userId) {
  const user = await userRepository.getById(userId);
  if (!user) throw new Error("User tidak ditemukan");

  const updated = await userRepository.update(userId, {
    is_active: 'Y',
    app: 'Y'
  });

  // Emit notifikasi ke room 'admin'
  getIO().to('admin').emit('user_approved', {
    id: user.id,
    username: user.username,
    fullname: user.fullname,
    message: "Akun sudah diaktifkan",
  });

  return updated;
}

module.exports = { login, registerUser, approveUser };