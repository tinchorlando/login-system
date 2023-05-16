const { Router } = require("express");
const router = Router();
const validateCredentials = require("../../utils/authorizator");
const { googleRegister, googleLogin, localRegister, localLogin, logout, resetPasswordSolicitation, resetPasswordValidation, changePassword, resetPasswordChange } = require("../../controllers/authControllers.js");

//register con google
router.post("/register/google",googleRegister);
//login con google
router.post("/login/google",googleLogin)
//register local
router.post("/register", localRegister);
//login local
router.post("/login", localLogin);
//logout
router.post("/logout", logout);
//reseteo de contraseña
router.get("/reset_password/request/:email",resetPasswordSolicitation)
router.get("/reset_password/validate/:id/:code",resetPasswordValidation)
router.put("/reset_password/change",resetPasswordChange)
//cambio de contraseña
router.put("/changePassword/:userId", validateCredentials ,changePassword);

router.get("/profile", async (req, res, next) => {});
module.exports = router;
