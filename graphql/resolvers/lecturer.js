const Lecturer = require('../../models/lecturer');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');
const { subjects } = require('./merge');

module.exports = {
    lecturerSubjects: (args) => {
        return Lecturer.findOne({ userId: '5d024183ed016b2480d859c9' })
            .then(lecturer => {
                return {...lecturer._doc, enrolledSubjects: subjects(lecturer.enrolledSubjects) }
            })
            .catch(err => {
                throw err
            })
    }
}