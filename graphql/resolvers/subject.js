const Subject = require('../../models/subject');
const Course = require('../../models/course');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');
const { subjects, course, assignments } = require('./merge');

module.exports = {
    subjects: (args) => {
        return Subject.find({ course: args.courseId })
            .then(subjects => {
                return subjects.map((obj) => {
                    return {...obj._doc, course: course(obj._doc.course), assignments: assignments(obj._doc.assignments) }
                })
            })
            .catch(err => {
                throw err
            })
    },

    createSubject: (args) => {
        // if (!req.isAuth) {
        //     throw new Error("User not authenticated")
        // }
        const subject = Subject({
            name: args.subjectInput.name,
            key: args.subjectInput.key,
            description: args.subjectInput.description,
            course: args.subjectInput.course
        })

        let createdSubject;
        return subject.save()
            .then(subject => {
                createdSubject = {...subject._doc, course: course(subject._doc.course), assignments: assignments(subject._doc.assignments) }
                return Course.findById(args.subjectInput.course);
            })
            .then(course => {
                if (!course) {
                    throw new Error("Course does not exist");
                }
                course.subjects.push(subject)
                return course.save()
            })
            .then(course => {
                return createdSubject
            })
            .catch(err => {
                throw err
            })
    }
}