import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    issuer: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    expires:{
        type: String,
    },
    credentialId: {
        type: String,
    },
    credentialUrl: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    skills: {
        type: [String],
    },
}, { timestamps: true });

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;