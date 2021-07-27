const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
    username: {
    type: String,
    required: [true, 'Veuillez entrer un nom d\'utilisateur.'],
    unique: true
    },
    password: {
        type: String,
        required: [true, 'Veuillez entrer un mot de passe.']
    }
});
UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
    })
})
//export model
const user = mongoose.model('User', UserSchema);
module.exports = user
UserSchema.plugin(uniqueValidator);