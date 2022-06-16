const authController = require('../controllers/auth.controller');
const authValidator = require('../middleware/auth.validator');

const routes = (app) => {
    app.post('/Lily/api/v1/signup',authValidator.validateSignup, authController.signup);
    app.post('/Lily/api/v1/signin',authValidator.validateSignup, authController.signin);
}

module.exports = routes;