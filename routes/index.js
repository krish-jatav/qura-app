var express = require('express');
var router = express.Router();
var user = require('./users');
var mongoose = require('mongoose')
const passport = require('passport');


const localStrategy = require("passport-local");
passport.use(new localStrategy(user.authenticate()));


mongoose.connect('mongodb://127.0.0.1:27017/n16likeUser').then(result => {
    console.log("connect to database")
}).catch(err => {
    console.log(err)
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/register', async function(req, res, next) {
    let newUser = await user.create({
        username: req.body.username,
        fullName: req.body.fullName,
        password: req.body.password,
        pic: req.body.pic,

    })
    res.redirect(`/feed/${newUser.username}`)
});
router.get('/feed/:username', async(req, res, next) => {
    var allUsers = await user.find()
    var currentUser = await user.findOne({
        username: req.params.username
    })
    res.render('feed', { users: allUsers, loggedInUser: currentUser })
})
router.get('/like/:userId/currentUsername', async(req, res, next) => {
    var likedUser = await user.findOne({
        _id: req.params.userId
    })
    var loggedInUser = await
    user.findOne({
        username: req.params.currentUsername
    })
    likedUser.likes.push(loggedInUser._id)
    await likedUser.save()
    res.redirect(`/feed/${req.params.currentUsername}`)
})

module.exports = router;