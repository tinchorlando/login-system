const { getUserByEmail, getUserById, createUserGoogle, createUser, updateUserPassword } = require("../services/dbQuerys.js");
const {generateJWT} = require("../utils/jwt.js");
const { comparePassword, hashPassword } = require("../utils/password.js");
const { forgotPasswordMail } = require("../utils/nodemailer/nodemailer.js");
const { generateResetCode , validateResetCode } = require("../utils/general.js")


const googleRegister = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userFound = await getUserByEmail(email.toLowerCase());
    if (userFound) {
        const error = new Error(`El usuario con mail ${email} ya existe`)
        return res.status(400).json({msg: error.message})
    }
    const newUser = await createUserGoogle(email);
    const token = generateJWT(newUser.id);
    return res.cookie("jwt", token).status(200).json({
      id: newUser.id,
      email: newUser.email,
      admin: newUser.admin,
      token,
    });
  } catch (error) {
    next(error);
  }
};
const localRegister = async (req,res,next)=>{
    try{
        const { email , password } =req.body;
        if (!email || !password) {
            const error = new Error('Falta información')
            return res.status(400).json({msg: error.message})
        }
        const existingUser = await getUserByEmail(email.toLowerCase())
        if (existingUser){
            const error = new Error(`El mail ${email} ya se encuentra registrado`)
            return res.status(400).json({msg: error.message})
        } 
        else{
            const hashedPassword = await hashPassword(password)
            const newUser = await createUser(email,hashedPassword);
            let token = generateJWT(newUser.id);
            return res.cookie("jwt",token).status(200).json({
                id: newUser.id,
                email: newUser.email,
                admin: newUser.admin,
                token
            })
        }
    } catch (error){
        next(error)
    }
}


const googleLogin = async (req,res,next)=>{
    try{
        const {email} = req.body;
        const userFound = await getUserByEmail(email.toLowerCase());
        if (!userFound){
            const error = new Error(`El usuario no existe`)
            return res.status(400).json({msg: error.message})
        }
        const token = generateJWT(userFound.id);
        return res.cookie("jwt",token).status(200).json({
            id: userFound.id,
            email: userFound.email,
            admin: userFound.admin,
            token
        })
    } catch (error){
        next(error)
    }
}
const localLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userFound = await getUserByEmail(email.toLowerCase());
    if (!userFound) {
        const error = new Error(`El usuario ${email} no existe`);
        return res.status(400).json({ msg: error.message });
    }
    if (await comparePassword(password, userFound.password)) {
      let token = generateJWT(userFound.id);
      return res.cookie("jwt", token).status(200).json({
        id: userFound.id,
        email: userFound.email,
        admin: userFound.admin,
        token,
      });
    } else{
        const error = new Error('Contraseña incorrecta')
        return res.status(400).json({msg: error.message})
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req,res,next)=>{
    try{
        res.clearCookie("jwt");
        res.status(200).send("logged out");
    } catch (error){
        next(error)
    }
}

const resetPasswordSolicitation = async (req,res,next)=>{
    try{
        const { email } = req.params;
        const userFound = await getUserByEmail(email.toLowerCase());
        if (!userFound) {
            const error = new Error (`El usuario ${email} no se encuentra registrado`)
            return res.status(400).json({msg: error.message})
        }
        if (userFound && !userFound.password){
            const error = new Error (`El usuario ${email} fue registrado con google. Inicie sesión con el widget`)
            return res.status(400).json({msg: error.message})
        }
        const resetCode = generateResetCode(userFound);
        const mailData = {
            id: userFound.id,
            code: resetCode
        };
        forgotPasswordMail(email,mailData);
        return res.status(200).json({msg: 'Mail enviado'});
    } catch (error){
        next(error)
    }
}

const resetPasswordValidation = async (req,res,next)=>{
    try{
        const { id , code } = req.params;
        const isValidated = await validateResetCode(id, code);
        if (isValidated) return res.status(200).json({msg: 'Validado'});
        else {
            const error = new Error('Invalid code')
            return res.status(400).json({msg: error.message})
        }
    } catch (error){
        next(error)
    }
}

const resetPasswordChange = async (req, res, next) => {
  try {
    let { userId, newPassword } = req.body;
    const hashedPassword = await hashPassword(newPassword);
    const updatedUser = await updateUserPassword(userId, hashedPassword);
    if (updatedUser)
      return res.status(200).json({
        msg: "Contraseña reestablecida",
      });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req,res,next)=>{
    try{
        const {userId} = req.params;
        const { oldPassword , newPassword } = req.body;
        const userFound = await getUserById(userId);
        if (userFound && await comparePassword(oldPassword,userFound.password)){
            const hashedPassword = await hashPassword(newPassword)
            const updatedUser = await updateUserPassword(userId,hashedPassword);
            if (updatedUser) return res.status(200).json("Contraseña cambiada");
        } else{
            const error = new Error(`Contraseña incorrecta`)
            return res.status(400).json({msg: error.message})
        }
        
    } catch (error){
        next(error)
    }
}

module.exports = {
  googleRegister,
  googleLogin,
  localRegister,
  localLogin,
  logout,
  resetPasswordSolicitation,
  resetPasswordValidation,
  resetPasswordChange,
  changePassword
};