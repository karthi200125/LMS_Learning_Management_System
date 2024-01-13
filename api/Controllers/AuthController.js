import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import { createError } from '../Utils/CreateError.js'
import jwt from 'jsonwebtoken'

export const Register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return next(createError(400, "User already exists"));
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        next(createError(500, "User creation failed"));
    }
};


export const Login = async (req, res, next) => {
    const { email, password: enteredPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return next(createError(404, "User not found"));

        const isPasswordValid = bcrypt.compareSync(enteredPassword, user.password);
        if (!isPasswordValid) return next(createError(401, "Incorrect password"));

        const { password, ...data } = user._doc;

        const token = jwt.sign({ id: user._id, isAdmin: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: 'Lax', }).status(200).json({ token, ...data });
    } catch (error) {
        console.error(error);
        next(createError(500, "Login failed"));
    }
};

