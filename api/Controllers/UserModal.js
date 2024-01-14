import User from '../Models/UserModel.js';
import { createError } from '../Utils/CreateError.js';

export const UserUpdate = async (req, res, next) => {
    const { userId, username, profileImg } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { username, profileImg }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(createError(500, 'User update failed'));
    }
};

