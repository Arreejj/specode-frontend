const bcrypt = require("bcryptjs");

async function generateHash() {
  const password = "Admin123."; // The password you want to use
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("🔑 Hashed Password:", hashedPassword);
}

generateHash();
