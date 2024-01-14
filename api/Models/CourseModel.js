import mongoose, { Schema } from 'mongoose';

const CourseModel = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    category: { type: String, required: true },
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],

}, { timestamps: true });

export default mongoose.model("Course", CourseModel);
