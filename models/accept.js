const mongoose = require('mongoose');

const acceptSchema = new mongoose.Schema({
    lecturerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecturer'
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    accepted: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Accept', acceptSchema);