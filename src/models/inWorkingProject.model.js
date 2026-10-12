import mongoose from 'mongoose'

const inWorkingProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    tech: {
        type: [String],
        required: true,
    },
    liveUrl: {
        type: String,
        required: true,
    },
    githubUrl: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const InWorkingProject = mongoose.model('InWorkingProject', inWorkingProjectSchema);
export default InWorkingProject;