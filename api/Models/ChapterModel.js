import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    position: { type: Number },
    isPublished: { type: Boolean, default: false },    
    isFree: { type: Boolean, default: false },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, 
    userProgress: { type: String },
}, { timestamps: true });

const ChapterModel = mongoose.model("Chapter", ChapterSchema);

export default ChapterModel;
