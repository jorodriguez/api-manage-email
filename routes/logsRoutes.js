const router = require('express').Router();
const { getLogs } = require('../controllers/logController');

router.post('/',getLogs);

module.exports = router;