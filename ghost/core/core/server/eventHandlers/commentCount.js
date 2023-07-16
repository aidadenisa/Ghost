const debug = require('@tryghost/debug')('websockets');

module.exports = async (io, socket) => {
  const commentsService = require('../services/comments/');

  const count = await commentsService.controller.count({ options: { ids: '64a34854d0cf0ae5430faa0e' } })
  //     // on connect, send current value
  socket.emit('counts-events', count);

  // listen to to changes in value from client
  const commentAdded = async (ids) => {
    const count = await commentsService.controller.count({ options: { ids: ids } })
    debug(`[Websockets] received comment from client, count is now ${count}`);
    socket.emit('counts-events', count);
  }

  socket.on("comment:add", commentAdded);
}