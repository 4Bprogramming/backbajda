import cloudinary from '../Config/cloudinary.js';
import DBIMAGE from '../models/DBIMAGE.js';
import Project from '../models/Project.js';

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({}, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }).end(fileBuffer);
  });
};


export const uploadImages = async (req, res) => {
  try {
    const { files } = req;
    const image = files.image ? files.image[0] : null;
    const imagesArray = files.imagesArray ? files.imagesArray : [];

    if (!image && imagesArray.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    const cloudinaryObjectArray = [];

    if (image) {
      const imageBuffer = Buffer.from(image.buffer);
      const imageUrl = await uploadToCloudinary(imageBuffer);
      cloudinaryObjectArray.push(imageUrl);
    }

    for (const file of imagesArray) {
      const fileBuffer = Buffer.from(file.buffer);
      const fileUrl = await uploadToCloudinary(fileBuffer);
      cloudinaryObjectArray.push(fileUrl);
    }

    res.json(cloudinaryObjectArray);
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};
export const deleteImages = async (req, res) => {
  try {
     const body = await req.body;
    const { publicId, projectId } = body;
    console.log('publicId', publicId);

    if (!publicId && !projectId) {
      return res.status(400).json({ error: 'Image ID and Project ID are required' });
    }

    if (Array.isArray(publicId) && projectId) {
      await Promise.all(publicId.map(async (id) => {
        const response = await cloudinary.uploader.destroy(id);
        if (response.result !== 'ok') {
          throw new Error(`Failed to delete image with ID ${id}: ${response.result}`);
        }
      }));

      await Promise.all(publicId.map(async (cloudinaryID) => {
        await DBIMAGE.destroy({ where: { url: cloudinaryID } });
      }));
    } else if (publicId && !Array.isArray(publicId) && projectId) {
      const response = await cloudinary.uploader.destroy(publicId);
      if (response.result !== 'ok') {
        throw new Error(`Failed to delete image with ID ${publicId}: ${response.result}`);
      }

      await DBIMAGE.destroy({ where: { id: publicId } });
    } else if (publicId && !projectId) {
      const response = await cloudinary.uploader.destroy(publicId);
      if (response.result !== 'ok') {
        throw new Error(`Failed to delete image with ID ${publicId}: ${response.result}`);
      }
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: `Failed to delete image: ${error.message}` });
  }
};
