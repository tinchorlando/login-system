const nodemailer = require("nodemailer")
const { MAIL_HOST , MAIL_PORT , MAIL_USER , MAIL_PASSWORD , FRONT_URL} = process.env

const baseURL = FRONT_URL || 'http://localhost:5173'

const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: true,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    },
    tls : { rejectUnauthorized: false }
})
transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  })
    

const newUserMail = async(email)=>{
        transporter.sendMail({
            from: 'Login-Frame',
            to: email,
            subject: "Cuenta creada en loginFrame",
            text:"Has creado una cuenta en loginFrame",
            html:`<p><b>Bienvenido ${email}!</b></p>
            <p>Se ha abierto tu cuenta en loginFrame</p>        
            `
        },(err,info)=>{
            if (err){
                console.log('Error occurred. ', + err);
                return process.exit(1)
            }
            console.log(('Message sent: %s', info.messageId));
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        })    
}

const forgotPasswordMail = async(email, data)=>{
    transporter.sendMail({
        from: 'Login-Frame  <dev-testing@tinchorlando.com>',
        to: email,
        subject: "Un reseteo de contraseña ha sido solicitado",
        text: `Has solicitado una nueva contraseña para tu usuario en nuestro sitio. Por favor, dirígete hacia el siguiente link para continuar con el proceso: 
        Resetear contraseña.
        Si no fuiste tú, por favor, ignora este mail`,
        html: `<p>Has solicitado una nueva contraseña para tu usuario en nuestro sitio. Por favor, dirígete hacia el siguiente link para continuar con el proceso: </p>
        <a href="${baseURL}/forgot-password/${data.id}/${data.code}">Resetear contraseña</a>.
        <p>Si no fuiste tú, por favor, ignora este mail</p>`
    },(err,info)=>{
        if (err){
            console.log('Error occurred. ', + err);
            return process.exit(1)
        }
        console.log(('Message sent: %s', info.messageId));
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    })    
}

module.exports = {
    newUserMail,
    forgotPasswordMail
}