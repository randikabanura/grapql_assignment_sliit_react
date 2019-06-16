const Lecturer = require('../../models/lecturer');
const Subject = require('../../models/subject');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');
const { subjects, user } = require('./merge');

module.exports = {
    lecturerSubjects: (args) => {
        return Lecturer.findOne({ userId: '5d024183ed016b2480d859c9' })
            .then(lecturer => {
                return {...lecturer._doc, enrolledSubjects: subjects(lecturer.enrolledSubjects) }
            })
            .catch(err => {
                throw err
            })
    },

    assignLecturer: (args) => {
        let assignLecturer
        return Subject.findById(args.subjectId)
            .then(subject => {
                if (!subject) {
                    throw new Error("Subject not available")
                }
                return Lecturer.findById(args.lecturerId)
                    .then(lecturer => {
                        lecturer.lecturerSubjects.push(args.subjectId);
                        return lecturer.save();
                    })
            })
            .then(lecturer => {
                assignLecturer = {...lecturer._doc, userId: user(lecturer._doc.userId), lecturerSubjects: subjects(lecturer._doc.lecturerSubjects) }
                Subject.findById(args.subjectId)
                    .then(subject => {
                        subject.lectures.push(lecturer);
                        return subject.save();
                    })
            })
            .then(subject => {
                return assignLecturer;
            })
            .catch(err => {
                throw err;
            })
    }
}