    import { Sequelize, DataTypes } from "sequelize";

    const sequelize = new Sequelize("employees", "postgres", "Nishanth@70", {
        host: "localhost",
        dialect: "postgres",
        });

    const Employee = sequelize.define("Employee",{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type : DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        mobileNumber:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,   
        },
        department:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    sequelize.sync()
        .then(() => console.log("Employee Created"))
        .catch((err) => console.error("Error syncing database:", err));

    export default Employee;