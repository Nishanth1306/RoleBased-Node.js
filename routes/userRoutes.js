import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const SECRET_KEY = "SupportApplication";
const router = express.Router();


router.get("/profile", authenticateJWT, (req, res) => {
    res.json({ message: "User Profile Access", user: req.user });
});

router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;

    if (!["admin", "user"].includes(role)) {
        return res.status(400).json({ message: "Invalid role. Use 'admin' or 'user'." });
    }
    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists. Choose a different one." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword, role });

        res.status(201).json({ message: "User Registered", username: newUser.username, role: newUser.role });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });


    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }
    
    const token = jwt.sign({ username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login Successful", token });
    console.log("User logged in successfully");
});

export default router;
