const express = require('express');
const router = express.Router();

const post = require('../models/post_model');

router.get('/', (req, res) => {
    post
        .find()
        .sort({date: -1})
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(404).send({success: false}))
});

router.post('/', (req, res) => {
    const {title, body, rating, tags} = req.body;
    const newPost = new Data({title: title, body: body, rating, tags});
    newPost
        .save()
        .then(post => res.status(200).json(post));
});

router.post('/update/:id', (req, res) => {
    const {title, body, rating, tags} = req.body;

    post.updateOne({
        _id: req.params.id
    }, {
            $set: {
                title: title,
                body: body,
                rating: rating,
                tags: tags
            }
        })
        .then(post => {res.status(200).json({success: true})})
        .catch((err) => res.send(404).json({success: false}))
});

router.post('/delete/:id', (req, res) => {
    const Id = req.params.id;
    post
        .findByIdAndDelete(Id)
        .then((post) => res.status(200).send({success: true}))
        .catch((err) => console.log(err))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;