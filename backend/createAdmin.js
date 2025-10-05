const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("Admin@1234", 10);

  const existingAdmin = await User.findOne({ email: "admin@agent.com" });

  if (existingAdmin) {
    await User.updateOne(
      { email: "admin@agent.com" },
      { $set: { password: hashedPassword } }
    );
    console.log("Admin password updated");
  } else {
    const adminUser = new User({
      name: "Admin",
      email: "admin@agent.com",
      password: hashedPassword
    });
    await adminUser.save();
    console.log("Admin user created");
  }

  mongoose.disconnect();
};

createAdmin();
