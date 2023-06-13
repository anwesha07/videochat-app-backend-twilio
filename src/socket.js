const { Server } = require('socket.io');

const createSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', (socket) => {
    console.log(`client ID: ${socket.id}`);
    // console.log(socket.rooms); // Set { <socket.id> }
    socket.on('clientConnected', (roomId, callback) => {
      callback('RoomId received at Server');
      // console.log(roomId);
      socket.join(roomId);
      // console.log(socket.rooms);
      socket.on('message', (msgObject) => {
        console.log(msgObject);
        socket.to(roomId).emit('messageReceived', msgObject);
      });
    });
  });
};

module.exports = createSocketServer;
