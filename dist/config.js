"use strict";
module.exports = {
    api: {
        port: process.env.API_PORT || 9000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || "secretnote!"
    },
};
