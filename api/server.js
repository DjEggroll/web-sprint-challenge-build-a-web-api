const express = require('express');

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

const server = express();

server.use(express.json());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({

        message: err.message,
        stack: err.stack
    })
})

module.exports = server;
