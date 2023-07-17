const debug = require('@tryghost/debug')('websockets');
const commentsService = require('../services/comments');

module.exports = async (io, socket) => {

  // listen to to changes in value from client
  const commentAdded = async (ids) => {
    const count = await commentsService.controller.count({ options: { ids: ids } })
    debug(`[Websockets] received comment add event from client, count is now ${count.count}`);
    // emit change in count to all other listeners
    socket.broadcast.emit('comments:count', count);
  }

  socket.on("comments:add", commentAdded);
}