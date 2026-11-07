const bcrypt = require("bcryptjs");

async function generateHash() {
  const password = "Ipsita@569";

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Hashed Password:");
  console.log(hashedPassword);
}

generateHash();