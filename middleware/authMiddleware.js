import jwt from "jsonwebtoken";
const SECRET_KEY = "SupportApplication";


export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        const user = jwt.verify(token, SECRET_KEY);
        req.user = user; 
        next();
    } catch {
        res.status(403).json({ message: "Invalid Token" });
    }
};


export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin Access Only" });
    }
    next();
};
