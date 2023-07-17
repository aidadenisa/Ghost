import {socket} from './socket';

const attachWebSocketEvents = () => {

  socket.on('connect', () => {
    console.log('websocket connected');
  });

  socket.on("connect_error", () => {
    console.log('websocket connect error');
  });

}

module.exports = () => {
  attachWebSocketEvents();
}