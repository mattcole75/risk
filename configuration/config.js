const convict = require('convict');

const config = convict({
    version: {
        type: String,
        default: '0.1'
    },
    application: {
        type: String,
        default: 'risk'
    },
    db: {
        uri: {
            type: String,
            default: process.env.DB_URI
        }
    },
    auth: {
        uri: {
            type: String,
            default: process.env.AUTH_URI
        }
    }
});

module.exports = config;