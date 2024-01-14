import CourseModel from '../Models/CourseModel.js';
import { createError } from '../Utils/CreateError.js'

export const CourseCreate = async (req, res, next) => {
    const { userId, title, description, imageUrl, isPublished, price, category, chapters } = req.body;
    try {
        const newCourse = await CourseModel.create({ userId, title, description, imageUrl, isPublished, category, chapters, price });
        res.status(201).json(newCourse);
    } catch (error) {
        next(createError(500, "Course creation failed"));
    }
};


export const CourseDelete = async (req, res, next) => {
    const { courseId } = req.body;
    try {
        await CourseModel.findByIdAndDelete(courseId);
        res.status(200).json("Course deleted successfully");
    } catch (error) {
        next(createError(500, "Chapter delete failed"));
    }
}

export const CourseUpdate = async (req, res, next) => {
    const { courseId } = req.body;
    try {
        const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, { $set: req.body }, { new: true });
        res.status(200).json(updatedCourse);
    } catch (error) {
        next(createError(500, "Chapter update failed"));
    }
}

export const getAllCourse = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const allcourses = await CourseModel.find({ userId });
        res.status(200).json(allcourses);
    } catch (error) {
        next(createError(500, "get all courses failed"));
    }
}

export const getSingleCourse = async (req, res, next) => {
    const { courseId } = req.body;
    try {
        const singlecourse = await CourseModel.findById(courseId);
        res.status(200).json(singlecourse);
    } catch (error) {
        next(createError(500, "get all courses failed"));
    }
}