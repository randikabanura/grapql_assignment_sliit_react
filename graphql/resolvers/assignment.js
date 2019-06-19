const Assignment = require('../../models/assignment')
const Subject = require('../../models/subject');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');
const { singleSubject, user } = require('./merge');

module.exports = {
    assignments: (args) => {
        return Assignment.find({ subject: args.subjectId })
            .then(assignments => {
                return assignments.map((obj) => {
                    return {...obj._doc, subject: singleSubject(obj._doc.subject), creator: user(obj._doc.creator), date: dateToString(obj._doc.date) }
                })
            })
            .catch(err => {
                throw err
            })
    },

    createAssignment: (args, req) => {
        // if (!req.isAuth) {
        //     throw new Error("User not authenticated")
        // }
        const assignment = Assignment({
            name: args.assignmentInput.name,
            description: args.assignmentInput.description,
            date: new Date(args.assignmentInput.date).toISOString(),
            subject: args.assignmentInput.subject,
            creator: '5d00bf4ced00fd2728e3cacf'
        })

        let createdAssignment;
        return assignment.save()
            .then(assignment => {
                createdAssignment = {...assignment._doc, subject: singleSubject(assignment._doc.subject), creator: user(assignment._doc.creator), date: dateToString(assignment._doc.date) }
                return Subject.findById(args.assignmentInput.subject);
            })
            .then(subject => {
                if (!subject) {
                    throw new Error("Subject does not exist");
                }
                subject.assignments.push(assignment)
                return subject.save()
            })
            .then(subject => {
                return createdAssignment
            })
            .catch(err => {
                throw err
            })
    }
}