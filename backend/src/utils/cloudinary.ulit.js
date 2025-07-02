import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.COULDINARY_CLOUD_NAME,})    // Cloudinary cloud name