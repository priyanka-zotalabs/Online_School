const { userJoin, getCurrentUser, userLeave, formatMessage, liveChatMessage } = require('./user');
const discussionForumModel = require("../../models/database/discussionForum");
const logger = require("../../lib/logger");

module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('adduser', function (data) {
            const user = userJoin(socket.id, data.username, data.room);
            // send client to room 
            socket.join(user.room);
            //socket.to(user.room).broadcast.emit('user-connected', user.username)
            // echo to client they've connected
            //socket.emit('updatechat', 'SERVER', 'you have connected to' + user.room);
            //socket.broadcast.to(user.room).emit('updatechat', 'SERVER', user.username + ' has connected to this room');
        });
        // socket.on('switchRoom', function (newroom) {
        //     // leave the current room (stored in session)
        //     socket.leave(socket.room);
        //     // join new room, received as function parameter
        //     socket.join(newroom);
        //     socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
        //     // sent message to OLD room
        //     socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
        //     // update socket session room title
        //     socket.room = newroom;
        //     socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
        // });
        // echo to room  that a person has connected to their room
        socket.on('chatMessage', data => {
            const user = getCurrentUser(socket.id);
            io.to(user.room).emit('updatechat', formatMessage(user.username, data.message, data.imageUrl, data.senderId, data.batchId));
            discussionForumModel
                .updateMessage(
                    {
                        courseId: data.courseId,
                        batchId: data.batchId,
                        contentId: data.contentId,
                    },
                    {
                        message: data.message,
                        senderDetails: {
                            senderId: data.senderId,
                            name: data.name,
                            imageUrl: data.imageUrl
                        }
                    }
                )
                .then((result) => {
                    logger.info(`addDiscussion - discussion message added successful`);
                });
        });

        socket.on('livechat', data => {
            const user = getCurrentUser(socket.id);
            io.to(user.room).emit('updatelivechat', liveChatMessage(user.username, data));
        });
        
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);
            // if (user) {
            //     io.to(user.room).emit(
            //         'updatechat',
            //         formatMessage(user.username, `${user.username} has left the chat`)
            //     );
        })

    })
}
