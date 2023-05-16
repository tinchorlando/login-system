# Login system
El proyecto nace de la necesidad de implementar un sistema de manejo de usuarios con autenticación y autorización en otro proyecto. Luego de intentar sin exito, tome la decisión de generar este apartado para practicar y estudiar los métodos y tecnologías necesarias para lograr el objetivo. Finalmente, el proyecto fue tomando forma y eventualmente se convirtió en un template que importaré y utilizaré en proyectos futuros.

Para ello fue necesario interiorizarme en los conceptos básicos de cómo funcionan algunas cookies, de que manera se pueden enviar, almacenar y recuperar de manera segura sin exponer los datos sensibles de los usuarios. También en cómo utilizar hasheadores, encriptar y desencriptar información, cómo integrar una plataforma (nodemailer) para poder enviar correos electrónicos en pos del funcionamiento del proyecto y distintos métodos para realizar un reestablecimiento de contraseña de manera segura para el usuario, sin comprometer sus datos.

Finalmente, la realización del proyecto intenta contemplar principios de programación SOLID, el cual me encuentro intentando pulir para futuros proyectos

### Pre-requisitos 📋

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

- __Node__: 12.18.3 o mayor
- __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

```bash
node -v
npm -v
```

### Instalación 🔧

El boilerplate cuenta con dos carpetas: `Api` y `Client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `Api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```env
DB_LINK= //link de conexión a la base de datos. //metodo://usuario:contraseña@host/dbname
PORT= //numero de puerto para la api
JWT_SECRET= //palabra secreta para JWT
COOKIE_SECRET = //palabra secreta para cookie-secret
COOKIE_OPTIONS = //objeto de configuracion de cookies
FRONT_URL = //url de deploy de frontend
//para el envio de mails:
MAIL_HOST=
MAIL_NAME=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=
```

Si se deseara realizar un deploy del repositorio, en la carpeta `Client` crear otro archivo llamado `.env` con:

```env
VITE_APP_GOOGLE_ID_CLIENT= //cliente de google
VITE_APP_API_URL= //URL de llamados a la api
```

Adicionalmente será necesario que creen desde psql una base de datos y realicen la conexión mediante DB_LINK

## Construido con 🛠️

* React
* Redux
* Express
* Sequelize - Postgres
* Json Web Token
* nodemailer
* Cookie-parser
* react-oauth/google

## Funcionalidades 💪
El sitio permite:
- Registración e inicio de sesión de usuarios de forma local, con ingreso de usuario y contraseña, o utilizando un widget de google
- Verificación y autorización/rechazo de ingreso a páginas/endpoints en la API/database que requieran credenciales
- Cambio de contraseña mediante ingreso como usuario y reestablecimiento de la misma, en caso de haberla olvidado, mediante intercambio de emails

## Imágenes ✨

<p align="center">
  <img width="890" src="./images/1.jpeg" />
  <img width="890" src="./images/2.jpeg" />
  <img width="890" src="./images/3.jpeg" />
  <img width="890" src="./images/4.jpeg" />
  <img width="890" src="./images/5.jpeg" />
  <img width="890" src="./images/6.jpeg" />
</p>
