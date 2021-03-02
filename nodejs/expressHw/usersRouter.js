const path = require('path');
const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'hello/hello.html'));
    })
    .post((req, res) => {
        res.sendFile(path.join(__dirname, 'bye/bye.json'))
    });

router.route('/:id')
    .get((req, res) => {
        res.send(`Get user id ${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`Update user id ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Delete user id ${req.params.id}`);
    });

module.exports = router;