import express from 'express';
import { AllCourse, CourseCreate, CourseDelete, CourseUpdate, getSingleCourse } from '../Controllers/CourseController.js';
import { VerifyToken, VerifyUser } from '../Utils/VerifyToken.js';

const router = express.Router();

router.post("/getallcourses", AllCourse);
router.post("/getcourse", getSingleCourse);
router.post("/create", VerifyToken, VerifyUser, CourseCreate);
router.delete("/delete", VerifyToken, VerifyUser, CourseDelete);
router.put("/update", VerifyToken, VerifyUser, CourseUpdate);

export default router;
