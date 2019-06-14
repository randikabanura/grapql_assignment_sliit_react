const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }

})

module.exports = mongoose.model('Subject', subjectSchema);