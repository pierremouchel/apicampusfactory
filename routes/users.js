var express = require('express');
var router = express.Router();
const models = require('../models');

var validator = require('validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const Sequelize = require('sequelize');

const saltRounds = 10;

/**
 * @api {post} /users 1. Request Add User
 * @apiName PostUser
 * @apiGroup Users
 *
 * @apiParam {String} email User email.
 * @apiParam {String} password User password.
 * @apiParam {String} confpassword User password confirmation.
 *
 * @apiSuccess success User saved
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "email": "test@test.fr"
 *     }
 *
 * @apiError error Error description
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "This user already exist"
 *     }
 *
 * @apiDescription
 * Url parameter
 */

router.post('/', function(req, res, next) {

    signup_password = req.body.signup_password;
    signup_confpassword = req.body.signup_confpassword;
    signup_email = req.body.signup_email;

    var validationSignup = new Promise((success, error) => {
        if (validator.isEmpty(signup_password) || validator.isEmpty(signup_confpassword) || validator.isEmpty(signup_email)) {
            error('Empty field');
        } else if (signup_password.length < 5) {
            error('Password must have a minimum of 5 characters');
        } else if (signup_password != signup_confpassword) {
            error('Wrong passwords');
        } else if (validator.isEmail(signup_email) == false) {
            error('Wrong email');
        } else if (validator.isEmpty(signup_email) == false) {
            models
                .user
                .findOne({
                    where: {
                        email: signup_email
                    }
                }).then(
                    user => {
                        if (user) {
                            error('This email already exist');
                        } else {
                            success('User saved');
                        }
                    }
                );
        }
    })

    validationSignup
        .then(function(success) {
            var salt = bcrypt.genSaltSync(saltRounds);
            var hash = bcrypt.hashSync(signup_password, salt);

            models
            .user
            .create({
                email: signup_email,
                password: hash,
                salt: salt
            }).then(function(result){
              var token = jwt.sign({id: result['dataValues']['id']}, '8KBBxkxH4hx5zRyVzH');
              models.user.update(
                { token: token },
                { where: { id: result['dataValues']['id'] } }
              )
              .catch(err =>
                console.log('Error query !')
              )
            });

            signup_error = undefined;

            signup_password = undefined;
            signup_confpassword = undefined;
            signup_email = undefined;

            res.render('index', {
                signup_validate: 'User created !'
            });

        })
        .catch(function(error) {
            res.render('index', {
                signup_error: error,
                email: signup_email
            });
        });
});

router.post('/signin', function(req, res, next) {
    signin_email = req.body.signin_email;
    signin_password = req.body.signin_password;

    var validationSignin = new Promise((success, error) => {
        if (validator.isEmpty(signin_email) || validator.isEmpty(signin_password)) {
            error('Empty field');
        } else if (validator.isEmail(signin_email)) {
            models
                .user
                .findOne({
                    where: {
                        email: signin_email
                    },
                    attributes: ['id', 'email', 'password', 'salt', 'token']
                }).then(
                    user => {
                        if (!user) {
                            error('Email doesn\'t exist !');
                        } else if (user.password == bcrypt.hashSync(signin_password, user.salt)) {
                          success(user);
                        } else {
                          error('Wrong password !');
                        }
                    }
                );
        }
    });

    validationSignin
        .then(function(success) {
            res.render('user', {
                user: success
            });
        })
        .catch(function(error) {
            res.render('index', {
                signin_error: error
            });
        });
});

/**
 * @api {get} /users/ 2. Request All Users
 * @apiName GetAllUsers
 * @apiGroup Users
 *
 * @apiSuccess {String} email User Email.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "email": "test@test.fr"
 *     }
 *
 * @apiError error The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 *
 * @apiDescription
 * Url parameter
 */
router.get('/', function(req, res, next) {
  var token = req.headers['x-access-token'];
  jwt.verify(token, '8KBBxkxH4hx5zRyVzH', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    models.user.findAll({
          attributes: ['id', 'email'],
          raw: true
    }).then(function(result){
        res.json({ result })
    });
  });
});

/**
 * @api {get} /user/:id 3. Request user by Id
 * @apiName GetUserById
 * @apiGroup Users
 *
 * @apiSuccess success User saved
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "email": "test@test.fr"
 *     }
 *
 * @apiError error Error description
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "This user already exist"
 *     }
 *
 * @apiDescription
 * Url parameter
 */
router.get('/:id', function(req, res, next) {
  var token = req.headers['x-access-token'];
  jwt.verify(token, '8KBBxkxH4hx5zRyVzH', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    models.user.findOne({
          attributes: ['id', 'email'],
          where:{
            id: req.params.id
          },
          raw: true
    }).then(function(result){
        res.json({ result })
    });
  });
});

/**
 * @api {delete} /user/:id 4. Delete user by Id
 * @apiName DeleteUserById
 * @apiGroup Users
 *
 * @apiSuccess success User saved
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "User delete"
 *     }
 *
 * @apiError error Error description
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "This user doesn't exist"
 *     }
 *
 * @apiDescription
 * Url parameter
 */
router.delete('/:id', function(req, res, next) {
  var token = req.headers['x-access-token'];
  jwt.verify(token, '8KBBxkxH4hx5zRyVzH', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    models.user.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(user){
      if (user == 1) {
        res.json({ success: 'User delete' })
      } else {
        res.json({ error: 'Error query' })
      }
    });
  });
});

/**
 * @api {put} /user/:id 5. Update user by Id
 * @apiName UpdateUserById
 * @apiGroup Users
 *
 * @apiSuccess success User saved
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "User update"
 *     }
 *
 * @apiError error Error description
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "This user doesn't exist"
 *     }
 *
 * @apiDescription
 * Url parameter
 */
router.put('/:id', function(req, res, next) {
  var token = req.headers['x-access-token'];
  jwt.verify(token, '8KBBxkxH4hx5zRyVzH', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    password = req.body.password;
    confpassword = req.body.confpassword;

    var validationUpdate = new Promise((success, error) => {
        if (password.length < 5) {
            error('Password must have a minimum of 5 characters');
        } else if (password != confpassword) {
            error('Wrong passwords');
        } else {
            success('Good password');
        }
    })

    validationUpdate
    .then(function(success) {
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);

        models.user.update({ password: hash, salt: salt }, {
          where: {
            id: req.params.id
          }
        }).then(function(user){
          console.log(user);
          if (user == 1) {
            res.json({ success: 'User update' })
          } else {
            res.json({ error: 'Error query' })
          }
        });
    }).catch(function(error) {
        res.json({ error: 'Error query' })
    });
  });
});

module.exports = router;
