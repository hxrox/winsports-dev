const config = {
    SERVER: {
        PORT: process.env.PORT || 3000
    },
    DATABASE: {
        MONGODB_STRING_CONNECTION: process.env.MONGODB_URI || 'mongodb://localhost:27017/winsports'
        // MONGODB_STRING_CONNECTION: process.env.MONGODB_URI || 'mongodb://heroku_k9w08kc2:u9jbesf6vsm15nbhlkaqedm6nm@ds147884.mlab.com:47884/heroku_k9w08kc2'
    }
}

export default config;