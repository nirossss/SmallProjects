// npm used : express dotenv ejs nodemon bcrypt passport passport-local express-session express-flash method-override

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id),
)

const port = process.env.PORT || 3000;

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuth, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

app.route('/login')
    .get(checkNotAuth, (req, res) => {
        res.render('login.ejs')
    })
    .post(checkNotAuth, passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }))

app.route('/register')
    .get(checkNotAuth, (req, res) => {
        res.render('register.ejs')
    })
    .post(checkNotAuth, async (req, res) => {
        const { name, email, password } = req.body
        try {
            const hashedPass = await bcrypt.hash(password, 10)
            users.push({
                id: Date.now().toString(),
                name: name,
                email: email,
                password: hashedPass
            })
            res.redirect('/login')
        } catch{
            res.redirect('/register')
        }
        console.log(users)
    })

app.delete('/logout', (req, res) => {// used npm method-override for not using post method (safer)
    req.logOut()
    res.redirect('/login')
})

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(port, () => console.log(`Server running on port ${port}`));