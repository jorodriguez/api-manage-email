const router = require('express').Router();
const { sendEmail } = require('../controllers/emailController');

router.post('/',sendEmail);

module.exports = router;