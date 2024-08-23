const express = require("express")

const userControllers = require("../controllers/UserController");


const router = express.Router();


router.post("/registration", userControllers.Registration);
router.post("/login", userControllers.Login);






module.exports = router;