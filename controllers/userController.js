import { registerUser, loginUser } from "../services/userService.js";

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: "User Registered", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.json({ message: "Login Successful", user, token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
