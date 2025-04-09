import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." }); // Unauthorized
    }
    return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." }); // Forbidden
        }
        req.user = decoded;
        next();
        return;
    });
};
