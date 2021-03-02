const port = process.env.PORT || 3000;
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const { data } = require('./events.json');

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}))
app.use(session({
    secret: process.env.SECRET || ':):(:D:P',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}))

const newGuest = (req, res, next) => {
    if (req.session.views === undefined) {
        req.session.views = 1;
        res.send([`<h1>Welcome New Guest</h1>`])
    } else {
        res.send([`<h1>Welcome</h1>`])
    }
    next();
}

app.get('/events', (req, res) => {
    res.json(data);
})
app.get('/newGuest', newGuest)

app.listen(port, () => console.log(`server listening on port ${port}`));