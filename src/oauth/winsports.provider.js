//import authServer from 'oauth2-server';
var authServer = require('oauth2-server');
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import applicationModel from '../models/application.model';
import userModel from '../models/user.model';
import sessionModel from '../models/session.model';

import config from '../server.config';

const model = {
    grantTypeAllowed: (clientId, grantType, callback) => {
        return callback(false, true);
    },
    getClient: (clientId, clientSecret, callback) => {
        applicationModel.findOne({ clientId: clientId }).then(application => {
            return callback(false, application);
        }).catch(error => {
            return callback(false, false);
        });
    },
    getUser: (username, password, callback) => {
        userModel.findOne({ $or: [{ userName: username }, { email: username }] }).then(user => {

            if (!user.emailConfirmed || user.deletedAt || !user.active) {
                let error = {
                    emailConfirmed: user.emailConfirmed,
                    deletedAt: user.deletedAt,
                    active: user.active
                };
                return callback(error, false);
            }

            if (bcrypt.compareSync(password, user.password)) {
                return callback(false, user);
            }
            else {
                return callback(false, false);
            }
        }).catch(error => {
            return callback(false, false);
        });
    },
    saveAccessToken: (accessToken, clientId, expires, user, callback) => {
        applicationModel.findOne({ clientId: clientId }).then(application => {
            let session = new sessionModel({
                user: user._id,
                application: application._id,
                ipAddress: '127.0.0.1',
                accessToken: accessToken,
                os: 'undefined',
                expiredAt: expires
            });

            session.save().then(sessionSaved => {
                return callback(false);
            }).catch(error => {
                return callback(true);
            })
        }).catch(error => {
            return callback(true);
        });
    },
    generateToken: (type, req, callback) => {
        const audience = req.oauth.client.clientId;
        const secretKey = Buffer.from(req.oauth.client.clientSecret, 'base64');
        const issuer = 'http://auth.winsports.mx/';
        const exp = new Date();

        const user = req.user;

        const options = {
            algorithm: 'HS256',
            audience: audience
        }

        let payload = {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            iss: issuer
        }

        exp.setSeconds(exp.getSeconds() + config.SERVER.AUTH.JWT_ACCESS_TOKEN_EXPIRY_SECONDS);
        payload.exp = exp.getTime();

        return callback(false, jwt.sign(payload, secretKey, options));
    },
    getAccessToken: (accessToken, callback) => {
        const clientId = 'f3ffe8e1f804f2074aa5cc55233673b8';
        const clientSecret = 'ZjNmZmU4ZTFmODA0ZjIwNzRhYTVjYzU1MjMzNjczYjg=';
        const issuer = 'http://auth.winsports.mx/';
        const secretKey = Buffer.from(clientSecret, 'base64');

        const options = {
            audience: clientId,
            issuer: issuer
        }

        jwt.verify(accessToken, secretKey, options, (error, accessTokenDecode) => {
            if (error) return callback(true);

            return callback(false, { expires: new Date(accessTokenDecode.exp), user: accessTokenDecode });
        });
    }
};

export default authServer({
    model: model,
    grants: config.SERVER.AUTH.GRANTS,
    debug: config.SERVER.AUTH.DEBUG,
    allowBearerTokensInQueryString: true,
    accessTokenLifetime: config.SERVER.AUTH.JWT_ACCESS_TOKEN_EXPIRY_SECONDS
});