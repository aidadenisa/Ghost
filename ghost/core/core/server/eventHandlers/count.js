const debug = require('@tryghost/debug')('websockets');

module.exports = async (io, socket) => {
  let count = 0;

  // on connect, send current value
  socket.emit('addCount', count);
  
  // listen to to changes in value from client
  const addCount = () => {
      count = count + 1;
      debug(`[Websockets] received addCount from client, count is now ${count}`);
      socket.broadcast.emit('addCount', count);
  };

  socket.on("count", addCount);
}
