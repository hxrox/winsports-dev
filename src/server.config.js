const config = {
    SERVER: {
        PORT: process.env.PORT || 3000,
        AUTH: {
            GRANTS: ['password'],
            JWT_ACCESS_TOKEN_EXPIRY_SECONDS: 31536000,
            DEBUG: true
        }
    },
    DATABASE: {
        MONGODB_STRING_CONNECTION: process.env.MONGODB_URI || 'mongodb://localhost:27017/winsports'
        // MONGODB_STRING_CONNECTION: process.env.MONGODB_URI || 'mongodb://heroku_k9w08kc2:u9jbesf6vsm15nbhlkaqedm6nm@ds147884.mlab.com:47884/heroku_k9w08kc2'
    },
    EMAIL: {
        HOST: 'mail.winsports.mx',
        PORT: 465,
        SECURE: true,
        AUTH: {
            USER: 'noreply@winsports.mx',
            PASSWORD: '3m4ilwin$p0rts2018'
        }
    },
    OPENPAY: {
        IS_PRODUCTION: false,
        SANDBOX: {
            MERCHANT_ID: 'mbksnzm4aaqpxwu10jtz',
            PRIVATE_KEY: 'sk_1a1fc94640a0487a950782d7b63cd947',
            PUBLIC_KEY: 'pk_77a31f6ff4ad474291c56563a7c63925',
            URL: 'https://sandbox-api.openpay.mx/v1'
        },
        PRODUCTION: {
            MERCHANT_ID: '',
            PRIVATE_KEY: '',
            PUBLIC_KEY: '',
            URL: ''
        }
    }
}

export default config;