const express = require("express")

const userControllers = require("../controllers/UserController");
const { VerifyToken } = require("../utility/verifyToken");


const router = express.Router();


router.post("/registration", userControllers.Registration);
router.post("/login", userControllers.Login);
router.post('/google', userControllers.Google);
router.post('/update-user/:ids', VerifyToken, userControllers.UpdateUser);
router.delete('/delete-user/:ids', VerifyToken, userControllers.DeleteUser);
router.get("/signout", userControllers.SignOut);






module.exports = router;