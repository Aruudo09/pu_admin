const chatController = require('./controllers/api/chat.controller');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 User connected');

    socket.on('chat message', async (msg) => {
      const saved = await chatController.saveMessage(msg);
      if (saved) {
        io.emit('chat message', {
          username: saved.username,
          message: saved.message,
          created_at: saved.created_at
        });
      }
    });

    socket.on('disconnect', () => {
      console.log('🔴 User disconnected');
    });
  });
};
