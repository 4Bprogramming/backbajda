import { Router } from "express";
import {createProject, getAllProjects, getProjectById, updateProject, deleteProject} from '../controllers/projectController.js'

const router = Router();

router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/', deleteProject);



export default router;