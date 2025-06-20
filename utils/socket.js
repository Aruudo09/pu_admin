let ioInstance = null;

module.exports = (io) => {
  ioInstance = io; // ⬅️ Tambahkan baris ini!

  io.on('connection', (socket) => {
    console.log('🟢 User connected');

    socket.on('join_admin_room', (user) => {
      if (user.id_level == 1) {
        socket.join('admin');
        console.log(`👑 ${user.username} joined admin room`);
      }
    });

     // Handler TEST (trigger dari frontend)
    socket.on("trigger_fake_register", () => {
      console.log("🚨 Fake register triggered!");

      io.to("admin").emit("user_registered", {
        username: "tester",
        fullname: "Tester Simulasi"
      });
    });

    socket.on('chat message', async (msg) => {
      // handle chat message
    });

    socket.on('disconnect', () => {
      console.log('🔴 User disconnected');
    });
  });
};

// Fungsi untuk mengambil io dari luar (misalnya dari service)
module.exports.getIO = function () {
  if (!ioInstance) {
    throw new Error("Socket.IO belum diinisialisasi");
  }
  return ioInstance;
};
