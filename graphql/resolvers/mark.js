const Mark = require('../../models/mark');
const Student = require('../../models/student')
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');
const { user, singleAssignment, singleStudent } = require('./merge');

module.exports = {

    markForStudent: (args) => {
        const mark = Mark({
            description: args.markInput.description,
            assignment: args.markInput.assignment,
            student: args.markInput.student,
            mark: args.markInput.mark,
            creator: '5d0275061c9d4400009fb189'
        })

        let createdMark;
        return mark.save()
            .then(mark => {
                createdMark = {...mark._doc, creator: user(mark._doc.creator), student: singleStudent(mark._doc.student), assignment: singleAssignment(mark._doc.assignment) }
                return Student.findById(args.markInput.student)
            })
            .then(student => {
                student.markIds.push(mark);
                return student.save()
            })
            .then(student => {
                return createdMark
            })
            .catch(err => {
                throw err
            })
    }

}