import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default verifyToken;