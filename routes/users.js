var express = require('express');
var router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.post('/signup', (req, res, next) => {

  User.find({username:req.body.username})
  .then(result=>{
    if(result.length<1){

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(404).json({
            message: err
          })
        } else {
          const user = new User({
            username: req.body.username,
            password: hash
          });
          user.save()
            .then(result => {
              res.status(200).json({
                message: result
              })
            })
            .catch(err => {
              res.status(404).json({
                message: err
              })
            })
        }
      });

    }
    else{
      res.status(404).json({
        message : 'username already existe'
      })
    }
    
  })
  .catch(err=>{
    res.status(404).json({
      message:err
    })
  })




});

router.get('/', (req, res, next) => {
  const users = User.find({}, 'username password')
    .then(result => {
      res.status(200).json({
        message: result
      })
    })
    .catch(err => {
      res.status(404).json({
        message: err
      })
    })

});

module.exports = router;
