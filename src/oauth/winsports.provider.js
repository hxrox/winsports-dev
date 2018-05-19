import authServer from 'oauth2-server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import ApplicationModel from '../models/application.model'
import UserModel from '../models/user.model'
import SessionModel from '../models/session.model'

import config from '../server.config'

const model = {
  grantTypeAllowed: (clientId, grantType, next) => {
    return next(false, true)
  },
  getClient: (clientId, clientSecret, next) => {
    ApplicationModel.findOne({ clientId: clientId }).then(application => {
      return next(false, application)
    }).catch(errors => {
      return next(false, false)
    })
  },
  getUser: (username, password, next) => {
    UserModel.findOne({ $or: [{ userName: username }, { email: username }] }).then(user => {
      if (!user.emailConfirmed || user.deletedAt || !user.active) {
        let error = {
          emailConfirmed: user.emailConfirmed,
          deletedAt: user.deletedAt,
          active: user.active
        }
        return next(error, false)
      }

      if (bcrypt.compareSync(password, user.password)) {
        return next(false, user)
      } else {
        return next(false, false)
      }
    }).catch(errors => {
      return next(false, false)
    })
  },
  saveAccessToken: (accessToken, clientId, expires, user, next) => {
    ApplicationModel.findOne({ clientId: clientId }).then(application => {
      let session = new SessionModel({
        user: user._id,
        application: application._id,
        ipAddress: '127.0.0.1',
        accessToken: accessToken,
        os: 'undefined',
        expiredAt: expires
      })

      session.save().then(sessionSaved => {
        return next(false)
      }).catch(errors => {
        return next(true)
      })
    }).catch(errors => {
      return next(true)
    })
  },
  generateToken: (type, req, next) => {
    const audience = req.oauth.client.clientId
    const secretKey = Buffer.from(req.oauth.client.clientSecret, 'base64')
    const issuer = 'http://auth.winsports.mx/'
    const exp = new Date()

    const user = req.user

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

    exp.setSeconds(exp.getSeconds() + config.SERVER.AUTH.JWT_ACCESS_TOKEN_EXPIRY_SECONDS)
    payload.exp = exp.getTime()

    return next(false, jwt.sign(payload, secretKey, options))
  },
  getAccessToken: (accessToken, next) => {
    const clientId = 'f3ffe8e1f804f2074aa5cc55233673b8'
    const clientSecret = 'ZjNmZmU4ZTFmODA0ZjIwNzRhYTVjYzU1MjMzNjczYjg='
    const issuer = 'http://auth.winsports.mx/'
    const secretKey = Buffer.from(clientSecret, 'base64')

    const options = {
      audience: clientId,
      issuer: issuer
    }

    jwt.verify(accessToken, secretKey, options, (error, accessTokenDecode) => {
      if (error) return next(true)

      return next(false, { expires: new Date(accessTokenDecode.exp), user: accessTokenDecode })
    })
  }
}

export default authServer({
  model: model,
  grants: config.SERVER.AUTH.GRANTS,
  debug: config.SERVER.AUTH.DEBUG,
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: config.SERVER.AUTH.JWT_ACCESS_TOKEN_EXPIRY_SECONDS
})
