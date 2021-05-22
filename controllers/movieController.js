const router = require('express').Router();
const db = require('../db');
const MovieReview = require('../models/movieReview');
const validate = require('../middleware/validateSession');
const User = require('../models/user');

//CREATE NEW REVIEW
router.post('/review', validate, (req, res) => {
    MovieReview.create({
        title: req.body.title,
        year: req.body.year,
        comment: req.body.comment,
        owner: req.user.id,
        posterPath: req.body.posterPath
    })
        .then(review => res.status(200).json({ review }))
        .catch(err => res.status(500).json({ message: 'Could not Create Review', error: err }))
});

// UPDATE A REVIEW
router.put('/edit/:id', validate, (req, res) => {

    MovieReview.update(req.body, { where: { id: req.params.id, owner: req.user.id } })
        .then(update => res.status(200).json({ message: `Comment for ${req.params.id} has been updated successfully`, update }))
        .catch(err => res.status(500).json({ message: 'could not update comment', error: err }))
});

// REMOVE A REVIEW
router.delete('/remove/:id', validate, (req,res) => {
    MovieReview.destroy({where: {id: req.params.id, owner: req.user.id}})
        .then(removed => res.status(200).json({message: `Review ${req.params.id} Successfully destroyed`, removed }))
        .catch(err => res.status(500).json({message: 'review cannot be destroyed', error: err}))
})

//   GET USER'S REVIEWS
router.get('/profile', validate, (req, res) => {
   MovieReview.findAll({
        where: {
            owner: req.user.id
        }
    })
    .then(profile => res.status(200).json({message: `found ${profile.length} reviews for this user`, reviews: profile}))
    .catch(err => res.status(500).json({message: 'no reviews found for this user', error: err}))
});

// //GET ENTRIES BY USER
// router.get('/users/:username', validateSession, (req, res) => {
//     User.findAll({
//         where: {
//             userName: req.params.username
//         }
//     })
//         .then(chosenUser => MovieReview.findAll({ where: {owner: chosenUser.id}}))
//         .then(profile => res.status(200).json({message: `found ${profile.length} reviews for this user`, reviews: profile}))
//         .catch(err => res.status(500).json({message: 'no reviews found for this user', error: err}))
// });

module.exports = router;