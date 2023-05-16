const jwt = require("jsonwebtoken");
const {Usuario} = require("../config/db.config.js")
const validateCredentials = async (req, res, next) => {
    try {
      const { id } = jwt.verify(
        req.cookies.jwt,
        process.env.JWT_SECRET
        );
      const user = await Usuario.findByPk(id);
      if (!user) return res.status(400).send("User not found");
      next();
    } catch (error) {
      res.send(error);
    }
  };
module.exports=validateCredentials