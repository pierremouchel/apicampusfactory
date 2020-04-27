var express = require('express');
var router = express.Router();
const models = require('../models');

var jwt = require('jsonwebtoken');
var validator = require('validator');

const Sequelize = require('sequelize');

models.user.hasMany(models.message, {foreignKey: 'user_id' });
models.message.belongsTo(models.user, {foreignKey: 'user_id' });


/**
 * @api {get} /messages/:idUser 1. Request Messages from Users by User ID
 * @apiName GetMessageByUser
 * @apiGroup Messages
 *
 * @apiParam {Integer} user_id unique user ID.
 *
 * @apiSuccess {Integer} user_id User ID.
 * @apiSuccess {Integer} message Message description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": 1,
 *       "message": "Ceci est un message"
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
router.get('/:id', function(req, res, next) {
  var token = req.headers['x-access-token'];
  jwt.verify(token, '8KBBxkxH4hx5zRyVzH', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    models.message.findAll({
          attributes: ['user_id', 'message'],
          where:{
            user_id: req.params.id
          },
          raw: true
    }).then(function(result){
        res.json({ result })
    });
  });
});

/**
 * @api {post} /messages 2. Post Message
 * @apiName PostMessage
 * @apiGroup Messages
 *
 * @apiSuccess success Message saved
 *
 * @apiError error Error description
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User does not exist"
 *     }
 *
 * @apiDescription
 * Parameters in an encoded form.
 */
router.post('/', function(req, res, next) {
  var token = req.headers['x-access-token'];
  jwt.verify(token, '8KBBxkxH4hx5zRyVzH', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    var message = req.body.message;
    var userId = req.body.user_id;
    var validationMessage = new Promise((success, error) => {
        if (validator.isEmpty(message)) {
            error('Empty field !');
        } else if (validator.isEmpty(userId)){
            error('Empty user !');
        } else if (validator.isEmpty(message) == false) {
            models
                .user
                .findOne({
                    where: {
                        id: userId
                    }
                }).then(
                    user => {
                        if (user) {
                            success('User exists');
                        } else {
                            error('User does not exist.');
                        }
                    }
                );
        }
    })

    validationMessage
    .then(function(success) {
        models
        .message
        .create({
            message: message,
            user_id: userId
        }).then(function(result){
            res.json({ result })
        })
    })
    .catch(function(error) {
        res.json({ error })
    });
  });
});

/**
 * @api {delete} /messages/:id 3. Delete Message by id
 * @apiName DeleteMessageById
 * @apiGroup Messages
 *
 * @apiParam {Integer} id Message unique ID.
 *
 * @apiSuccess success Message delete
 *
 * @apiError error Message not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "MessageNotFound"
 *     }
 *
 * @apiDescription
 * Url parameter.
 */
router.delete('/:id', function(req, res, next) {
  var token = req.headers['x-access-token'];
  jwt.verify(token, '8KBBxkxH4hx5zRyVzH', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    models.message.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(message){
      if (message == 1) {
        res.json({ success: 'Message delete' })
      } else {
        res.json({ error: 'Error query' })
      }
    });
  });
});

module.exports = router;
