const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
// const { use } = require('../routes');

// const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
// const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
// const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
// const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
function genPassword(password) {
  var salt = crypto.randomBytes(32).toString('hex');
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  return {
    salt: salt,
    hash: genHash,
  };
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
  //console.log("USER++++>>>", user)
  const expiresIn = '2w';
  //const expiresIn = '14d';

  const payload = {
    sub: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(
    payload,
    process.env.ACCESS_SECRET_TOKEN,
    {
      expiresIn: expiresIn,
      //algorithm: 'RS256',
    }
  );

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
    sub: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      //   // gender: user.gender,
      //   // birthday: user.birthday,
      //   // is_active: user.is_active,
      //   // nationality_id: user.nationality_id,
      //   // player_card_url: user.player_card_url,
      //   // player_card_url_mini: user.player_card_url_mini,
      //   // category_id: user.category_id,
      //   // sub_category_id: user.sub_category_id
    },
  };
}

function authMiddleware(req, res, next) {
  if (req.headers.authorization) {
    const tokenParts = req.headers.authorization.split(' ');

    if (
      tokenParts[0] === 'Bearer' &&
      tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
    ) {
      try {
        const verification = jsonwebtoken.verify(
          tokenParts[1],
          process.env.ACCESS_SECRET_TOKEN,
          // {
          //   algorithms: ['RS256'],
          // }
        );
        req.jwt = verification;
        next();
      } catch (err) {
        res.status(401).json({
          success: false,
          status: 'Unauthorized',
          msg: 'You are not authorized to visit this route 1',
        });
      }
    } else {
      res.status(401).json({
        success: false,
        status: 'Unauthorized',
        msg: 'You are not authorized to visit this route 2',
      });
    }
  } else {
    res.status(401).json({
      success: false,
      status: 'TokenError',
      msg: 'You are not authorized to visit this route 3',
    });
  }
}

function decodeToken(token) {
  var authorization = token.split(' ')[1];
  var decodedVal = jsonwebtoken.verify(authorization, PUB_KEY, {
    algorithms: ['RS256'],
  });
  console.log('decodedVal', decodedVal);
  return decodedVal;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.authMiddleware = authMiddleware;
module.exports.decodeToken = decodeToken;
