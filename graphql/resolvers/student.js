const Student = require('../../models/student');
const Subject = require('../../models/subject');
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
        return Student.findOne({ userId: '5d037e32169a524190dd9392' })
            .then(student => {
                return {...student._doc, enrolledSubjects: subjects(student.enrolledSubjects) }
            })
            .catch(err => {
                throw err
            })
    },

    enrollForSubject: (args) => {
        let enrolledStudent;
        return Student.findOne({ _id: '5d037e32169a524190dd9392' })
            .then(student => {
                student.enrolledSubjects.push(args.subjectId);
                return student.save();
            })
            .then(student => {
                enrolledStudent = {...student._doc, enrolledSubjects: subjects(student.enrolledSubjects) }
                return Subject.findOne({ _id: args.subjectId })
                    .then(subject => {
                        subject.enrolledStudents.push(student);
                        return subject.save();
                    })
            })
            .then(subject => {
                return enrolledStudent
            })
            .catch(err => {
                throw err
            })

    }
}