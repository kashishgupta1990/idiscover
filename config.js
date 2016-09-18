module.exports = {
    "development":{
        'secretKey': '58251-98356-01381-99266',
        'mongoUrl' : 'mongodb://lavish:abcdef@ds029486.mlab.com:29486/tm',
        'facebook': {
            clientID: '302944536723584',
            clientSecret: '49c2b60e24730dfab3ed1d5668911aa8',
            callbackURL: 'http://localhost:3000/users/facebook/callback'
        }
    },
    "production":{
        'secretKey': '58251-98356-01381-99266',
        'mongoUrl' : 'mongodb://lavish:abcdef@ds029486.mlab.com:29486/tm',
        'facebook': {
            clientID: '302944536723584',
            clientSecret: '49c2b60e24730dfab3ed1d5668911aa8',
            callbackURL: 'http://enter-your-heroku-url/users/facebook/callback' // Update in heroku / facebook app as well
        }
    }
};
