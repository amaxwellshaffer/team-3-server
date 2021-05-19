const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/test', (req, res) => {
    res.send('testing user controller yuuuuuuu');
});

router.post('/register', (req, res) => {
    User.create({ 
        email: req.body.email, 
        password: bcrypt.hashSync(req.body.password, 10),
        userName: req.body.userName
    })
    .then(user => {
        let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '1d'})
        res.send({user, token})
    })
    .catch(error => res.status(500).send({
        message:'user not created',
        error: error.errors[0].message
    }))
});

router.post('/login', (req, res) => {
    User.findOne({
        where:{
            email: req.body.email
        }
    })
    .then(user => {
        if(user){
            //compare passwords
            bcrypt.compare(req.body.password, user.password, function(err, matches){
                matches ? generateToken(user) : res.send('password is incorrect')
            })

            function generateToken(user){
                //create the token
                let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '1d'});
                //send response
                res.send({message:`welcome, ${user.userName}`, user, token})
            }

        } else {
            res.send('no user found')
        }
        //res.send(`welcome, ${user.firstName}`)
    })
})



module.exports = router;