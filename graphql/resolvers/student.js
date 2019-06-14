const Student = require('../../models/student');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');
const { subjects } = require('./merge');

module.exports = {
    students: (args) => {
        return Student.find({ enrolledSubjects: { $in: args.subjectId } })
            .then(students => {
                return students.map((obj) => {
                    return {...obj._doc, enrolledSubjects: subjects(obj._doc.enrolledSubjects) }
                })
            })
            .catch(err => {
                throw err
            })
    },

    enrolledSubjects: (args) => {
        return Student.findOne({ userId: '5d024183ed016b2480d859c9' })
            .then(student => {
                return {...student._doc, enrolledSubjects: subjects(student.enrolledSubjects) }
            })
            .catch(err => {
                throw err
            })
    }
}