const User=require('../models/user')
const passport=require('passport')
const bcrypt = require('bcrypt')

exports.userinsert=(req,res)=>{
    const {name,email,password, conpass} = req.body
   const newUser= new User({name:name,email:email,password:password,conpass:conpass})
   newUser.save()
    bcrypt.genSalt(10, (err,salt) => {
      bcrypt.hash(newUser.password,salt,(err, hash) =>{
          if (err) throw err;
          newUser.password = hash;
          newUser.save().catch((err) => console.log(err));
          console.log(newUser);
          req.logIn(newUser, (err) => {
              if (err) {
                  console.log(err);
                  return next(err);
              }
              // Send the user as a welcome mail here.
              res.send({ msg: 'successful registeration', user: req.user });
              //res.send({ msg: 'successful registeration', user: CryptoJS.AES.encrypt(JSON.stringify(req.user), process.env.BEMINE_ENCRYPTER_KEY).toString() });
          });
      });
  });
  console.log(newUser)
}

exports.logininsert=async(req,res, next)=>{
    passport.authenticate('local', (err, user, info) => {
      if (err) {
          return next(err);
      }
      if (!req.body.email)
          return res.send({
              message: 'You have not inputed your email address.',
          });
      if (!req.body.password)
          return res.send({ message: 'Please enter your password.' });
      if (!user) {
          return res.send({ message: 'Invalid email or password.' });
      }
      req.logIn(user, (err) => {
          if (err) {
              console.log(err);
              return next(err);
          }
          console.log('Successful login');
           res.send({ message: 'Successful Login', user: user._doc });
          //res.send({ message: 'Successful Login', user: CryptoJS.AES.encrypt(JSON.stringify(user._doc), process.env.BEMINE_ENCRYPTER_KEY).toString() });
      });
  })(req, res, next);
  }