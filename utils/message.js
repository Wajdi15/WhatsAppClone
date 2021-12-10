const moment = require('moment')

function messageDetails(userName,message) {
    return {
        userName,
        message,
        time : moment().format('h:m a') //GET time in format h:mn a
    }
}

module.exports = messageDetails;