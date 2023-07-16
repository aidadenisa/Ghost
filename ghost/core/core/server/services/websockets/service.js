const {Server} = require('socket.io');
const debug = require('@tryghost/debug')('websockets');
const logging = require('@tryghost/logging');

const labs = require('../../../shared/labs');
const handlers = require('../../eventHandlers');

module.exports = {
    async init(ghostServer) {
        debug(`[Websockets] Is labs set? ${labs.isSet('websockets')}`);

        if (labs.isSet('websockets')) {
            logging.info(`Starting websockets service`);

            const io = new Server(ghostServer.httpServer);

            // Here we register the handlers for the bidirectional communication
            const onConnection = (socket) => {
                handlers.forEach(handler => {
                    handler(io, socket);
                })
            }
            io.on("connection", onConnection);

            ghostServer.registerCleanupTask(async () => {
                logging.warn(`Stopping websockets service`);
                await new Promise((resolve) => {
                    io.close(resolve);
                });
            });
        }
    }
};
