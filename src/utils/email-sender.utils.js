import nodemailer from 'nodemailer'

import config from '../server.config'

let transporter = nodemailer.createTransport({
  host: config.EMAIL.HOST,
  port: config.EMAIL.PORT,
  secure: config.EMAIL.SECURE,
  auth: {
    user: config.EMAIL.AUTH.USER,
    pass: config.EMAIL.AUTH.PASSWORD
  }
})

export default transporter
