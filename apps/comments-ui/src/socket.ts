import { Socket, io } from 'socket.io-client';

let socket: Socket;

const setupSocket = (siteUrl: string) => {
  const URL = siteUrl;
  socket = io(URL);
}

export {
  setupSocket,
  socket
};