const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

        // minLength: 2
    },
    email: {
        type: String,
        required: true,

        // minLength: 10
    },
    password: {
        type: String,
        required: true,

        // minLength: 4
    },
    repeatPassword: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});



// userSchema.path('username')
//     .validate(function () {
//         return this.username.length >= 2
//     }, 'Username must be at least 2 symbols long!')

// userSchema.path('email')
//     .validate(function () {
//         return this.email.length >= 10
//     }, 'Email address must be at least 10 symbols long!');

// userSchema.path('password')
//     .validate(function () {
//         return this.password.length >= 4
//     }, 'Password must be at least 4 symbols long!');

// userSchema.virtual('repeatPassword')
//     .set(function (value) {
//         if (this.password !== value) {
//             throw new Error('Password mismatch!')
//         }
//     });

const User = mongoose.model('User', userSchema);

module.exports = User;