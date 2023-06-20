const Animal = require('../models/Animal');

exports.getAll = () => Animal.find().populate('owner');

exports.getOne = (animalId) => Animal.findById(animalId).populate('owner');

exports.create = (animalData) => Animal.create(animalData);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.getDonationsByUser = (userId) => Animal.findById({ donations: userId});

exports.update = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.addDonation = async (animalId, userId) => {
    const animal = await Animal.findById(animalId);

    animal.donations.push(userId);
}
