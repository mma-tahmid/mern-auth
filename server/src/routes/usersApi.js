const express = require("express")

const userControllers = require("../controllers/UserController");


const router = express.Router();


router.post("/registration", userControllers.Registration);
router.post("/login", userControllers.Login);
router.post('/google', userControllers.Google);






module.exports = router;