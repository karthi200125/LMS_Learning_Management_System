import express from 'express';
import { ChapterCreate, ChapterDelete, ChapterUpdate, getAllChapter } from '../Controllers/ChapterController.js';

const router = express.Router();

router.post("/create", ChapterCreate);
router.delete("/delete", ChapterDelete);
router.put("/update", ChapterUpdate);
router.get("/getall", getAllChapter);

export default router;
