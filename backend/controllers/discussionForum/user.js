const moment = require('moment');
const { databaseMicroService } = require('../../config');

function liveChatMessage(username, data) {
    return {
        username: username,
        text: data.message,
        imageUrl: data.imageUrl,
        senderId: data.senderId,
        time: moment().format('h:mm a')

    };
}

function formatMessage(username, text, imageUrl, senderId, batchId) {
    return {
        username,
        text,
        imageUrl,
        senderId,
        batchId,
        time: moment().format('h:mm a')
    };
}
const users = [];

// Join user to chat
function userJoin(id, username, room) {
    const user = { id, username, room };

    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}


module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    formatMessage,
    liveChatMessage
};