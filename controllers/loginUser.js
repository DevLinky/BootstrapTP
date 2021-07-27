const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// const User = require('../models/User')
const User = mongoose.model('User')
module.exports = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {  // if passwords match
                            // store user session
                    req.session.userId = user._id        
                    res.redirect('/')
                }
                else {
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })
}