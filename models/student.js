const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
    enrolledSubjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    markIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mark'
    }]
})

module.exports = mongoose.model('Student', studentSchema);