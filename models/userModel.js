import { Sequelize, DataTypes } from "sequelize";


const sequelize = new Sequelize("employees", "postgres", "Nishanth@70", {
  host: "localhost",
  dialect: "postgres", 
});

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },
});

sequelize.sync()
  .then(() => console.log("User  created"))
  .catch((err) => console.error("Error syncing database:", err));

export default User;
