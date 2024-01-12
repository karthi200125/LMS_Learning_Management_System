import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import { createError } from '../Utils/CreateError.js'

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
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return next(createError(404, "User not found"));

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return next(createError(401, "Incorrect password"));

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        next(createError(500, "Login failed"));
    }
};
