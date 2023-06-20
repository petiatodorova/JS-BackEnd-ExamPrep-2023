const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name should be at least 2 characters!']
    },
    years: {
        type: Number,
        required: [true, 'Years are required'],
        minValue: [1, 'Years should be at least 1!'],
        maxValue: [100, 'Years should be maximum 100!'],
    },
    kind: {
        type: String,
        required: [true, 'Kind is required'],
        minLength: [3, 'Kind should be at least 3 characters!']
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: /^https?:\/\//
    },
    need: {
        type: String,
        required: [true, 'Need is required'],
        minLength: [3, 'Need should be at least 3 characters!'],
        maxLength: [20, 'Need should be maximum 20 characters!']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [5, 'Location should be at least 3 characters!'],
        maxLength: [15, 'Location should be maximum 15 characters!']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5, 'Description should be at least 3 characters!'],
        maxLength: [50, 'Description should be maximum 50 characters!']
    },
    donations: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});



const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;