const router = require('express').Router();

const animalManager = require('../managers/animalManager');
const { TOKEN_KEY } = require('../config/config');
const { getErrorMessage } = require('../utils/errorHelpers');

async function isOwner(req, res, next) {
    let animal = await animalManager.getOne(req.params.animalId);

    if (animal.owner == req.user._id) {
        res.redirect(`/animals/${req.params.animalId}/details`);
    } else {
        next();
    }
}

async function checkIsOwner(req, res, next) {
    let animal = await animalManager.getOne(req.params.animalId);

    if (animal.owner == req.user._id) {
        next();
    } else {
        res.redirect(`/animals/${req.params.animalId}/details`);
    }
}

router.get('/dashboard', async (req, res) => {
    let animal = await animalManager.getAll();
    res.render('animals/dashboard', { title: 'Dashboard', animal});
});

// router.get('/create-review', isAuth, (req, res) => {
//     res.render('animals/create', { title: 'Create Review' });
// });

// router.post('/create', isAuth, async (req, res) => {
//     try {
//         await animalManager.create({ ...req.body, owner: req.user._id });
//         res.redirect('/animals/dashboard');
//     } catch (error) {
//         res.render('animals/create', { error: getErrorMessage(error)})
//     }
    
// });

// function getErrorMessage(error) {
//     let errorsArr = Object.keys(error.errors);

//     if (errorsArr.length > 0) {
//         return error.errors[errorsArr[0]];
//     } else {
//         return error.message
//     }

// }

router.get('/:animalId/details', async (req, res) => {
    let animal = await animalManager.getOne(req.params.animalId);
    let animalData = animal.toObject();
    let isOwner = animalData.owner == req.user?._id;

    let wished = animal.getWished();

    let isWished = req.user && wished.some(c => c._id == req.user?._id);

    res.render('animals/details', { ...animalData, isOwner, isWished });
});

router.get('/:animalId/details', isOwner, async (req, res) => {
    const animalId = req.params.animalId
    let animal = await animalManager.getOne(animalId);

    animal.wishingList.push(req.user._id);
    await animal.save();
    res.redirect(`/animals/${req.params.animalId}/details`);
});

router.get('/:animalId/edit', checkIsOwner, async (req, res) => {
    const animalId = req.params.animalId
    let animal = await animalManager.getOne(animalId);
    res.render('animals/edit', { ...animal.toObject() })
});

router.post('/:animalId/edit', checkIsOwner, async (req, res) => {
    try {
        const animalId = req.params.animalId;
        const animalData = req.body;
        await animalManager.update(animalId, animalData);
        res.redirect(`/animals/${animalId}/details`);
    } catch (error) {
        res.render('animal/edit', { error: getErrorMessage(error)})
    }
    
});

router.get('/:animalId/delete', checkIsOwner, async (req, res) => {
    const animalId = req.params.animalId;
    await animalManager.delete(animalId);
    res.redirect('/animals/catalog');
})

module.exports = router;