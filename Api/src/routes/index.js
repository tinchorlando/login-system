const { Router } = require("express");
const router = Router();
const user = require("./controllers/user.js");

router.use("/user",user);
module.exports= router