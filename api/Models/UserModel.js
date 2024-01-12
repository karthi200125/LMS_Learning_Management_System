import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    profileImg: {
        type: String
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    coursesEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
}, {
    timestamps: true
});

export default mongoose.model("User", UserSchema);
