import User from '../Models/UserModel.js';
import { createError } from '../Utils/CreateError.js';

export const UserUpdate = async (req, res, next) => {
    const { userId, chapterId } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: req.body, $push: { ChapterCompleted: chapterId } }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(createError(500, 'Update failed'));
    }
};