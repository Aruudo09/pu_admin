const path = require("path");
const bcrypt = require("bcrypt");
const { User } = require("../models");

class AuthController {
  showLoginForm(req, res) {
    res.render("login"); // akan mencari login.ejs di folder /views
  }

  async login(req, res) {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.render("login", { error: "Username tidak ditemukan" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.render("login", { error: "Password salah" });
      }
  
      req.session.user = {
        id: user.id,
        username: user.username,
        fullname: user.fullname, // ini penting kalau kamu mau pakai fullname
      };
      return res.redirect("/home");
    } catch (error) {
      console.error(error);
      return res.render("login", { error: "Terjadi kesalahan pada server" });
    }
  }

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
}

module.exports = new AuthController();
