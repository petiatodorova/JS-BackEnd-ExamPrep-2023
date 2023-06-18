const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const User = require('../models/User');
const SECRET = 'fd36960a-90b0-476d-a058-17ae45752a59';

exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid user or password');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid user or password');
    }

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    return token;
}

// exports.register = (userData) => User.create(userData);
exports.register = async (userData) => {
    const user = await User.findOne({ username: userData.username });
    if (user) {
        throw new Error('Username already exists!');
    }

    return User.create(userData);
}

<<<<<<< HEAD
=======
exports.register = (email, username, password, repeatPassword) => {
    
}
>>>>>>> parent of fe6c429 (Register added and tested.)

exports.logout = () => {
    
}