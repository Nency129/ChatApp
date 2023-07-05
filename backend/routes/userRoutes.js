const express = require("express");
const { registerUser,authUser} = require("../controller/userController");
const router = express.Router();

router.post('/login',authUser);
router.post('/',registerUser);

module.exports = router;
