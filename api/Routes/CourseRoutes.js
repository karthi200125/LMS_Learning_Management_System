import express from 'express';
import { AllCourse, CourseCreate, CourseDelete, CourseUpdate, getSingleCourse } from '../Controllers/CourseController.js';

const router = express.Router();

router.post("/getallcourses", AllCourse);
router.get("/getcourse", getSingleCourse);
router.post("/create", CourseCreate);
router.delete("/delete", CourseDelete);
router.put("/update", CourseUpdate);

export default router;
