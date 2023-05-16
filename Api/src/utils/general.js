const crypto = require('crypto');
const { getUserById } = require('../services/dbQuerys');

const getUserString = (user) => {
  return `${user.id}${user.email}${user.password}${user.updatedAt}`;
};

const differenceInHours = (timeStamp, newDate) => {
  let diff = Math.floor((newDate - timeStamp) / (1000 * 60 * 60));
  return diff > 1 ? false : true;
};

const getUserHash = (string) =>
  crypto.createHash("md5").update(string).digest("hex");

const generateResetCode = (user) => {
  const now = new Date();
  //Convert to base64
  const timeHash = Buffer.from(now.toISOString()).toString("base64");
  //user string
  const userString = getUserString(user);
  const userHash = getUserHash(userString);
  return `${timeHash}-${userHash}`;
};

const validateResetCode = async (id, resetCode = "") => {
  let validation = false;
  const [timeHash, reqUserHash] = resetCode.split("-");
  //decode timestamp
  const timestamp = Buffer.from(timeHash, "base64").toString("ascii");
  // if more than 24 hs, fail
  const validDates = differenceInHours(new Date(timestamp), new Date());
  if (validDates) {
    const userFound = await getUserById(id);
    if (userFound) {
      const userString = getUserString(userFound);
      const userHash = getUserHash(userString);
      validation = reqUserHash === userHash;
    }
  }
  return validation;
};

module.exports = {
    generateResetCode,
    validateResetCode,
}