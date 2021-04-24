var express = require('express');
const router = express.Router();

const { authUser, userDocument } = require('src/interfaces/http/controllers/userController');

router.post('/', authUser);
router.get('/', userDocument);

module.exports = router;
