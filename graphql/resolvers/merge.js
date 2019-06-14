const Subject = require('../../models/subject');
const Assignment = require('../../models/assignment');
const Course = require('../../models/course');
const User = require('../../models/user');
const Student = require('../../models/student');
const Lecturer = require('../../models/lecturer');

const { dateToString } = require('../../helpers/date')


const user = userId => {
    return User.findById(userId)
        .then(user => {
            return {...user._doc, details: details.bind(this, user.details, user.userRole) }

        })
        .catch(err => {
            console.log(err)
        })
}

const subjects = subjectIds => {
    return Subject.find({ _id: { $in: subjectIds } })
        .then(subjects => {
            return subjects.map((obj) => {
                return {...obj._doc, course: course.bind(this, obj.course), assignments: assignments.bind(this, obj.assignments) }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

const singleSubject = subjectId => {
    return Subject.findById(subjectId)
        .then(subject => {
            return {...subject._doc, course: course.bind(this, subject.course), assignments: assignments.bind(this, subject.assignments) }
        })
        .catch(err => {
            console.log(err)
        })
}

const course = courseId => {
    return Course.findById(courseId)
        .then(course => {
            return {...course._doc, subjects: subjects.bind(this, course._doc.subjects) }
        })
        .catch(err => {
            console.log(err)
        })
}

const assignments = assignmentIds => {
    return Assignment.find({ _id: { $in: assignmentIds } })
        .then(assignments => {
            return assignments.map((obj) => {
                return {...obj._doc, subjects: subjects.bind(this, obj._doc.subjects), creator: user.bind(this, obj.creator) }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

const singleAssignment = assignmentId => {
    return Assignment.findById(assignmentId)
        .then(assignment => {
            return {...assignment._doc, subjects: subjects.bind(this, assignment._doc.subjects), creator: user.bind(this, assignment._doc.creator) }
        })
        .catch(err => {
            console.log(err)
        })
}

const details = (detailsId, userRole) => {
    console.log(detailsId)
    if (userRole === 'student') {
        return Student.findById(detailsId)
            .then(student => {
                console.log(student)
                return {...student._doc, enrolledSubjects: subjects.bind(this, student._doc.subjects), userId: user.bind(this, student._doc.userId) }
            })
            .catch(err => {
                console.log(err)
            })
    } else if (userRole === 'lecturer') {
        return Lecturer.findById(detailsId)
            .then(lecturer => {
                return {...lecturer._doc, lecturerSubjects: subjects.bind(this, lecturer._doc.subjects), userId: user.bind(this, student._doc.userId) }
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        return null;
    }
}

const singleStudent = studentId => {
    return Student.findById(studentId)
        .then(student => {
            return {...student._doc, userId: user.bind(this, student._doc.userId) }
        })
        .catch(err => {
            console.log(err)
        })
}

exports.subjects = subjects
exports.course = course
exports.singleSubject = singleSubject
exports.assignments = assignments
exports.user = user
exports.singleAssignment = singleAssignment
exports.details = details
exports.singleStudent = singleStudent