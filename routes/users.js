var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
router.route('/profile')
/*.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    User.find({_id:req.decoded._id})
        .exec(function (err, type) {
        if (err) next(err);
        res.json(type);
    });
})*/

.get(Verify.verifyOrdinaryUser,function (req, res, next) {
     User.find({_id:req.decoded._id})
        .exec(function (err, type) {
        if (err) throw err;
        res.json(type);
    });
})

.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    User.find({_id:req.decoded._id})
    .exec(function (err, type) {
        if (err) next(err);
         User.update({_id:req.decoded._id},{ $set: req.body }, 
                function (err, type) {
                    if (err) throw err;
                    res.json(type);
                })
    })
});

/* type.usertype.id(req.params.kId).remove();
               // req.body.postedBy = req.decoded._id;
        type.usertype.push(req.body);
        type.save(function (err, type) {
            if (err) throw err;
            console.log('Updated usertype!');
            res.json(type);
        });*/

/*.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    User.find({_id:req.decoded._id})
    .exec(function (err, type) {
        if (err) next(err);
         User.update({_id:req.decoded._id},{ $set: req.body }, 
                function (err, type) {
                    if (err) throw err;
                    res.json(type);
                })
    })
}); */

router.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    User.find({}, function (err, user) {
      if(err) {
        err.status = 500
        next(err)
      }

      res.json(user)
    })
  }
);

router.route('/:Id')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    User.findById(req.params.Id)
        .exec(function (err, type) {
        if (err) next(err);
        res.json(type);
    });
})

.put(Verify.verifyOrdinaryUser,function (req, res, next) {
    User.findByIdAndUpdate(req.params.Id, {
        $set: req.body
    }, {
        new: true
    }, function (err, type) {
        if (err) throw err;
        res.json(type);
    });
})

router.route('/:Id/usertype')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    User.findById(req.params.Id)
        .exec(function (err, type) {
        if (err) next(err);
        res.json(type.usertype);
    });
})

.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    User.findById(req.params.Id, function (err, type) {
        if (err) next(err);
        type.usertype.push(req.body);
        type.save(function (err, type) {
            if (err) throw err;
            console.log('Updated usertype!');
            res.json(type);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    User.findById(req.params.Id, function (err, type) {
        if (err) throw err;
        for (var i = (type.usertype.length - 1); i >= 0; i--) {
            type.usertype.id(type.usertype[i]._id).remove();
        }
        type.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted usertype!');
        });
    });
});

router.route('/:Id/usertype/:kId')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    User.findById(req.params.Id)
        .exec(function (err, type) {
        if (err) next(err);
        res.json(type.usertype.id(req.params.kId));
    });
})

.put(Verify.verifyOrdinaryUser,function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    User.findById(req.params.Id, function (err, type) {
        if (err) next(err);
        type.usertype.id(req.params.kId).remove();
               // req.body.postedBy = req.decoded._id;
        type.usertype.push(req.body);
        type.save(function (err, type) {
            if (err) throw err;
            console.log('Updated usertype!');
            res.json(type);
        });
    });
})

router.route('/:Id/usertype/:kId/keywords/:tId')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    User.findById(req.params.Id)
        .exec(function (err, type) {
        if (err) next(err);
        res.json(type.usertype.id(type.usertype.keywords.id(req.params.tId)));
    });
})

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
                user.save(function(err,user) {
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

        var token = Verify.getToken({"username":user.username, "_id":user._id, "admin":user.admin});
      
        res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/profile/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});


router.get('/facebook', passport.authenticate('facebook'),
  function(req, res){});

router.get('/facebook/callback', function(req,res,next){
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
              var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

module.exports = router;
