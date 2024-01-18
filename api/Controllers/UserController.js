import User from '../Models/UserModel.js';
import { createError } from '../Utils/CreateError.js';

export const UserUpdate = async (req, res, next) => {
    const { userId } = req.body;    
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(createError(500, 'User update failed'));
    }
};

