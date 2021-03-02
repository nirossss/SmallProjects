const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authUser = async (email, password, done) => {
        const user = getUserByEmail(email);// return null if not found
        if (user == null) {
            return done(null, false, { message: 'no user with that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'password incorrect' })
            }
        } catch (e) {
            done(e)
        }
    }

    passport.use(new localStrategy({ usernameField: 'email' }, authUser))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize