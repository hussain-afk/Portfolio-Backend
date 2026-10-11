import ImageKit from '@imagekit/nodejs';
import envConfig from '../config/env.config.js';

const instance = new ImageKit({
    privateKey: envConfig.imagekitPrivateKey,
});

const uploadImage = async (image) => {
    const imageBuffer = image.buffer.toString('base64');
    try {
        const response = await instance.files.upload({
            file: imageBuffer,
            fileName: Math.random().toString(36).substring(2) + '.jpg', // Use the original name of the uploaded file
        });
        return response.url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export default uploadImage;