import mongoose, { Schema } from 'mongoose';

const CourseModel = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    price: { type: String },
    isPublished: { type: Boolean, default: false },
    category: { type: String },
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],

}, { timestamps: true });

export default mongoose.model("Course", CourseModel);
