var express = require('express');
var router = express.Router();

const User=require('../models/User');

/* GET users listing. */
router.post('/signup', (req, res, next)=> {
  const user = new User({
    username : req.body.username,
    password : req.body.password
  });
  user.save()
  .then(result=>{
    res.status(200).json({
      message : result
    })
  })
  .catch(err=>{
    res.status(404).json({
      message : err
    })
  })
});

router.get('/',(req,res,next)=>{
  const users = User.find({},'username password')
  .then(result=>{
    res.status(200).json({
      message:result
    })
  })
  .catch(err=>{
    res.status(404).json({
      message :err
    })
  })

});

module.exports = router;
