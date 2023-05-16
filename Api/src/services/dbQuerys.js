const { Usuario } = require("../config/db.config.js");

const getUserByEmail = async (email)=>{
    const userFound = await Usuario.findOne({
      where:{
        email
      }
    })
    return userFound
  }
const getUserById = async (id)=>{
    const userFound = await Usuario.findOne({
      where:{
        id
      }
    })
    return userFound
  }

const createUserGoogle = async (email)=>{
    const newUser = await Usuario.create({
        email,
      });
    return newUser
}
const createUser = async (email,password)=>{
    const newUser = await Usuario.create({
        email,
        password,
      });
    return newUser
}
const updateUserPassword = async (id , password)=>{
    const userFound = await getUserById(id);
    const updatedUser = await userFound.update({
        password,
    })
    return updatedUser
}

module.exports ={
    createUser,
    createUserGoogle,
    getUserByEmail,
    getUserById,
    updateUserPassword
}