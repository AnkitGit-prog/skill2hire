const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    organization: { type: String, required: true },
    type: { type: String, enum: ['Govt', 'Private'], required: true },
    vacancies: { type: String },
    qualification: { type: String },
    salary: { type: String },
    lastDate: { type: Date },
    applyLink: { type: String },
    notificationLink: { type: String },
    description: { type: String },
    category: { type: String, enum: ['Latest Jobs', 'Admit Card', 'Results'], default: 'Latest Jobs' },
    isFeatured: { type: Boolean, default: false },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
