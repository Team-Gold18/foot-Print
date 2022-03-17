const User = require('../models/user.model');
const Membership = require('../models/membership.model');
const UserAndMemberRelation = require('../models/userandmemberrelation.model');
const utils = require('../lib/utils.js');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.getMembershipDetails = async function (req, res) {
  try {
    Membership.getMembershipDetails(req.params.email, (err, result) => {
      console.log(result);
      if (err) {
        return res.status(201).json({
          success: 'true',
          code: 201,
          error: err,
        });
      }
      if (result.length) {
        return res.status(200).json({
          success: 'true',
          code: 200,
          data: result,
          message: 'Data successfully received',
        });
      } else {
        return res.status(200).json({
          success: 'true',
          code: 200,
          data: result,
          message: 'this email not in the database',
        });
      }
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: err.message,
    });
  }
};

//getMembershipConfirmation
exports.getMembershipConfirmation = async function (req, res) {
  const membership = parseInt(req.query.membership);
  const accessCode = parseInt(req.query.accesscode);

  try {
    Membership.getMembershipConfirmation(accessCode, (err, result) => {
      if (err) {
        return res.status(200).json({
          success: 'true',
          status: 'false',
          code: 200,
          error: err,
        });
      }

      if (result.length) {
        if (membership == result[0].membership_number) {
          return res.status(200).json({
            success: 'true',
            status: 'true',
            code: 200,
            data: result,
            message: 'Valid accessCode and membership_number',
          });
        } else {
          return res.status(200).json({
            success: 'true',
            status: 'false',
            code: 200,
            message: 'Invalid accessCode and membership_number',
          });
        }
      } else {
        return res.status(200).json({
          success: 'true',
          status: 'false',
          code: 200,
          message: 'invalid accessCode',
        });
      }
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: err.message,
    });
  }
};

//registerUser
exports.registerUser = async function (req, res) {
  const email = req.body.email;
  const membershipNumbers = req.body.memberAccessCodes;
  const saltHash = utils.genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    salt: salt,
    hash: hash,
  });

  try {
    if (!req.body) {
      res.status(400).json({
        code: 400,
        from: 'DB',
        status: 'BadRequest',
        message: 'Content can not be empty!',
      });
    }

    User.findByEmail(email, (err, data) => {
      if (data && data.length) {
        return res.status(200).json({
          success: false,
          message: `${email} is already exists`,
        });
      } else {
        // Create a User
        User.create(newUser, (err, user) => {
          if (err) {
            res.status(500).send({
              code: 500,
              status: 'Error',
              message: err.message,
            });
          } else {
            const tokenObject = utils.issueJWT(user);
            if (membershipNumbers.length) {
              UserAndMemberRelation.create(
                user.id,
                membershipNumbers,
                (err, data) => {
                  if (err) {
                    res.status(500).send({
                      code: 500,
                      status: 'Error',
                      message: err.message,
                    });
                  } else {
                  }
                }
              );
            }

            res.status(200).json({
              success: true,
              message: 'successfully registered user',
              token: tokenObject.token,
              expiresIn: tokenObject.expires,
              sub: tokenObject.sub,
            });
          }
        });
      }
      //Error Handling
      if (err) {
        console.log('ERROR');
        return res.status(400).json({ status: 400, message: err });
      }
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: err.message,
    });
  }
};

//loginUser
exports.loginUser = async function (req, res, next) {
  try {
    User.findOne(req.body.email, (err, user) => {
      if (!user) {
        console.log(err.message);
        return res.status(401).json({
          success: false,
          message: 'Invalid Email',
        });
      }

      const isValid = utils.validPassword(
        req.body.password,
        user[0].hash,
        user[0].salt
      );

      if (isValid) {
        const tokenObject = utils.issueJWT(user);

        res.status(200).json({
          success: true,
          status: 'LoginSuccess',
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
          sub: tokenObject.sub,
        });
      } else {
        res.status(401).json({
          success: false,
          status: 'PasswordError',
          message: 'you entered the wrong password',
        });
      }
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: err.message,
    });
  }
};

exports.updateUser = async function (req, res) {
  try {
    User.getUserById(req.params.id, async (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          code: 500,
          status: 'not success',
          message: 'error',
        });
      }
      if (data.length) {
        let result;
        if (req.file) {
          result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'profilePicture',
          });
        }

        const updatedUser = new User({
          first_name: req.body.first_name || data[0].first_name,
          last_name: req.body.last_name || data[0].last_name,
          profilePicture: result?.secure_url || data[0].profilePicture,
          email: req.body.email || data[0].email,
        });

        User.updateUser(req.params.id, updatedUser, (err, data) => {
          if (err)
            return res.status(500).send({
              success: false,
              code: 500,
              status: 'not success',
              message: err.message,
            });
          else {
            return res.status(200).json({
              success: true,
              code: 200,
              status: 'success',
              document: data,
            });
          }
        });
      } else {
        return res.status(200).json({
          success: true,
          code: 200,
          status: 'success',
          message: 'User is not found',
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
