const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Assignment', assignmentSchema);