const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
    description: {
        type: String
    },
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    mark: {
        type: Number,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Mark', markSchema);