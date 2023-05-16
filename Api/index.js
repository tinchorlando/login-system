const server = require("./src/config/app.js");
const { conn } = require("./src/config/db.config.js");
const { hashPassword, comparePassword } = require("./src/utils/password.js");
const PORT = process.env.PORT;
const { Usuario, Data } = require("./src/config/db.config.js");
const DATA = [{ balance: 100 }, { balance: 200 }, { balance: 300 }];
const USUARIOS =[
  {
    email:'dicksonberg@elpro.com',
    password: '1234',
    admin: true,
  },
  {
    email:'riggsandrews@elpro.com',
    password: '1234',
    admin: true,
  },
  {
    email:'calderonharrington@elpro.com',
    password: '1234',
    admin: true,
  },
]
conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    let i = -1;
    try {
      const alreadyCreated = await Usuario.findOne({
        where: {
          email: USUARIOS[0].email
        }
      })
      //creacion de usuarios
      if (!alreadyCreated){        
        USUARIOS.forEach(async (p) => {
          const newUser = await Usuario.create({
            email: p.email,
            password: await hashPassword(p.password),
            admin: p.admin,
          });
          i = i + 1;
          const newData = await Data.create({
            balance: DATA[i].balance,
          });
          await newData.setUsuario(newUser);
        });
      }
    } catch (error) {}
    console.log("%s listening at 3000");
  });
});
