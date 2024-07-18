// import {cloudinary_js_config} from '../Config/cloudinary.js'
import Project from "../models/Project.js";
import DBIMAGE from "../models/DBIMAGE.js";
import { v2 } from "cloudinary";
const cloudinary = v2;

// Crear un nuevo proyecto y asociar imágenes
export const createProject = async (req, res) => {
  try {
    const { body } = req.body;
    console.log('REQ.BODY==>', req.body);
    console.log('REQ.BODY.place==>', req.body.place);
    console.log('TYPEOF REQ.BODY.place==>',typeof req.body.place);
    
    const {images} = req.body.images
    const project = await Project.create({
      place: body.place,
      title: body.title,
      area: +body.area,
      description: body.description,
      rooms: +body.rooms,
      year: +body.year
    },);

    if (images && images.length > 0) {
      const imageRecords = images.map((object, index) => ({
        url: object.secure_url,
        main: index === 0 ? true : false,
        cloudinaryID: object.public_id,
        projectId: project.id,
      }));
      await DBIMAGE.bulkCreate(imageRecords);
    }
    console.log('project==>', project);
    console.log('imageRecords==>', imageRecords);
    res.status(201).json(project);
  } catch (error) {
    console.log('ERROR===>', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los proyectos con sus imágenes
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({ include: DBIMAGE });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un proyecto por ID con sus imágenes
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, { include: DBIMAGE });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un proyecto y sus imágenes
export const updateProject = async (req, res) => {
  try {
    const { images, ...projectData } = req.body;
    await Project.update(projectData, { where: { id: req.params.id } });

    if (images && images.length > 0) {
      // Crear nuevas imágenes
      const imagesUpdate = images.filter((image) => image.secure_url);
      const imageRecords = imagesUpdate.map((image, index) => ({
        url: image.secure_url,
        main: image.main ? image.main : false,
        cloudinaryID: image.public_id,
        projectId: req.params.id,
      }));
      await DBIMAGE.bulkCreate(imageRecords);
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un proyecto y sus imágenes asociadas
export const deleteProject = async (req, res) => {
  try {
    const { imageIds, projectId } = req.body;

    if (imageIds && imageIds.length > 0) {
      // Desconectar y eliminar imágenes
      await Promise.all(
        imageIds.map(async (idImage) => {
          await Image.destroy({ where: { cloudinaryID: idImage } });
        })
      );
    }

    if (projectId) {
      // Eliminar imágenes del proyecto en Cloudinary
      const images = await DBIMAGE.findAll({ where: { projectId } });
      const publicIds = images.map((image) => image.cloudinaryID);

      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDNAME,
        api_key: process.env.NEXT_PUBLIC_APIKEY,
        api_secret: process.env.NEXT_PUBLIC_SECRET,
      });

      await Promise.all(
        publicIds.map(async (id) => {
          const response = await cloudinary.uploader.destroy(id);
          if (response.result !== "ok") {
            throw new Error(
              `Failed to delete image with ID ${id}: ${response.result}`
            );
          }
        })
      );

      await DBIMAGE.destroy({ where: { projectId } });
      await Project.destroy({ where: { id: projectId } });
    }

    res
      .status(204)
      .json({ message: "Images and/or project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
