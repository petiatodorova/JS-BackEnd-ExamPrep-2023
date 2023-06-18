const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 2,
    },
    email: {
        type: String,
        required: true,
        minLength: 10,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    }
});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Password mismatch!')
        }
    })

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});


// userSchema.method('validatePassword', function (password) {
//     return bcrypt.compare(password, this.password);
// });

const User = mongoose.model('User', userSchema);

module.exports = User;