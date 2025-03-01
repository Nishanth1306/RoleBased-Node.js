import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const SECRET_KEY = "SupportApplication";

export const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await User.create({ ...userData, password: hashedPassword });
    return newUser;
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    return { user, token };
};
