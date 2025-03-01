import express from "express";
import { authenticateJWT, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/dashboard", authenticateJWT, authorizeAdmin, (req, res) => {
    res.json({ message: "Admin Dashboard Access Granted", user: req.user });
});

export default router;
