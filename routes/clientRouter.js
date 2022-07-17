const express = require("express");
const clientRouter = express.Router ();

clientRouter.use (express.static ('public'))
clientRouter.use ('/template', (req, res) => {
    res.render ('index', {
        nome: 'dear friend!',
        message: 'Welcome to my humble website that i made to train Node.JS!'
    })
})

module.exports = clientRouter