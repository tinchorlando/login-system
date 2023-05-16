const jwt = require ("jsonwebtoken");

const generateJWT = (id) =>{
    let token =jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"1h"
    })
    return token
}
module.exports= {generateJWT};