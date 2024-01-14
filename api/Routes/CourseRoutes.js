import express from 'express';
import { CourseCreate, CourseDelete, CourseUpdate, getAllCourse, getSingleCourse } from '../Controllers/CourseController.js';

const router = express.Router();

router.post("/create", CourseCreate);
router.delete("/delete", CourseDelete);
router.put("/update", CourseUpdate);
router.get("/getall", getAllCourse);
router.get("/getcourse", getSingleCourse);

export default router;
