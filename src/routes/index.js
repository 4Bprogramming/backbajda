import { Router } from "express";
import {createProject, getAllProjects, getProjectById, updateProject, deleteProject} from '../controllers/projectController.js'
import { deleteImages, uploadImages,  } from "../controllers/imageController.js";

const router = Router();

router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/', deleteProject);

router.post('/cloudinary/', uploadImages)
router.delete('/cloudinary/', deleteImages)



export default router;