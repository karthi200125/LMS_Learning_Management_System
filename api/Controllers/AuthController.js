import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import { createError } from '../Utils/CreateError.js';
import jwt from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";

export const Register = async (req, res, next) => {
    const { username, email, password , role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return next(createError(400, "User already exists"));

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({ username, email, password: hashedPassword, role });
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
        res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: 'Lax' }).status(200).json({ token, ...data });
    } catch (error) {
        console.error(error);
        next(createError(500, "Login failed"));
    }
};

export const GoogleLogin = async (req, res, next) => {
    const { credentials } = req.body;

    try {
        const decodedToken = jwtDecode(credentials);
        const { email, name, picture, azp } = decodedToken;
        const existuser = await User.findOne({ email });

        if (existuser === null) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(azp, salt);
            const newUser = await User.create({
                username: name,
                email: email,
                googleid: hashedPassword,
                profileImg: picture,
                role:"student"
            });
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            const user = newUser._doc;
            res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: 'Lax' }).status(200).json({ token, ...user });
        } else {
            const comparePassword = bcrypt.compareSync(azp, existuser.googleid);

            if (comparePassword) {
                const token = jwt.sign({ id: existuser._id, isAdmin: existuser.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
                const user = existuser._doc;
                res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: 'Lax' }).status(200).json({ token, ...user });
            } else {
                next(createError(401, 'Google authentication failed, something did not match'));
            }
        }
    } catch (error) {
        next(createError(500, "Google login failed"));
    }
};