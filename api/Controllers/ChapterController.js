import ChapterModel from "../Models/ChapterModel.js";
import CourseModel from "../Models/CourseModel.js";
import { createError } from '../Utils/CreateError.js'

export const ChapterCreate = async (req, res, next) => {
    const { title, description, videoUrl, courseId, isFree } = req.body;
    try {
        const newChapter = await ChapterModel.create({ title, description, videoUrl, courseId, isFree })
        await CourseModel.findByIdAndUpdate(courseId, { $push: { chapters: newChapter._id } }, { new: true });
        res.status(200).json(newChapter)
    } catch (error) {
        console.log(error)
        next(createError(500, "chapter createion failed"))
    }
}
export const ChapterDelete = async (req, res, next) => {
    const { chapterId } = req.body;
    try {
        await ChapterModel.findByIdAndDelete(chapterId);
        await CourseModel.updateOne({ chapters: chapterId }, { $pull: { chapters: chapterId } });
        res.status(200).json("Chapter deleted successfully");
    } catch (error) {
        next(createError(500, "Chapter delete failed"));
    }
}

export const ChapterUpdate = async (req, res, next) => {
    const { chapterId } = req.body;
    try {
        const updatedChapter = await ChapterModel.findByIdAndUpdate(chapterId, { $set: req.body }, { new: true });
        res.status(200).json(updatedChapter);
    } catch (error) {
        next(createError(500, "Chapter update failed"));
    }
};

export const getAllChapter = async (req, res, next) => {
    const { userId: courseId } = req.body;
    try {
        const getallchapters = await ChapterModel.find({ courseId })
        res.status(200).json(getallchapters);
    } catch (error) {
        next(createError(500, "get all chapters failed"));
    }
}

export const getSingleChapter = async (req, res, next) => {
    const { userId: chapterId } = req.body;
    try {
        const singleChapter = await ChapterModel.findById(chapterId);
        res.status(200).json(singleChapter);
    } catch (error) {
        next(createError(500, "Get single chapter failed"));
    }
};

