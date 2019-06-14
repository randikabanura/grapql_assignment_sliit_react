const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lecturerSubjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }]
})

module.exports = mongoose.model('Lecturer', lecturerSchema);