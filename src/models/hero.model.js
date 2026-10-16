import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
    avalaible: {
        type: Boolean,
        required: true,
    },
    mainHeading:{
        type: String,
        required: true,
    },
    paragraph: {
        type: String,
        required: true,
    },
    autoWritingText: {
        type: String,
        required: true,
    },
});

const Hero = mongoose.model('Hero', heroSchema);
export default Hero;