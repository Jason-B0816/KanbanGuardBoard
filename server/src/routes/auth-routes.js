import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' } // Token expires in 1 hour (you can adjust this)
        );
        console.log(token);
        res.json({ token });
        return;
    }
    catch (error) {
        console.error('Login error', error);
        res.status(500).json({ message: 'Server error during login' });
        return;
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
