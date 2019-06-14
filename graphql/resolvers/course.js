const Course = require('../../models/course');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');
const { subjects } = require('./merge');

module.exports = {
    courses: () => {
        return Course.find()
            .then(course => {
                return course.map((obj) => {
                    return {...obj._doc, subjects: subjects(obj._doc.subjects) }
                })
            })
            .catch(err => {
                throw err
            })
    },

    createCourse: (args, req) => {
        // if (!req.isAuth) {
        //     throw new Error("User not authenticated")
        // }
        const course = Course({
            name: args.courseInput.name,
            description: args.courseInput.description
        })
        return course.save()
            .then(course => {
                return {...course._doc, subjects: subjects(course._doc.subjects) }
            })
            .catch(err => {
                throw err
            })
    }
}