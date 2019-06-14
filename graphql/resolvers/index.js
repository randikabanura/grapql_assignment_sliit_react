const authResolver = require('./auth')


const courseResolver = require('./course')
const subjectResolver = require('./subject')
const assignmentResolver = require('./assignment')
const markResolver = require('./mark')
const studentResolver = require('./student')
const lecturerResolver = require('./lecturer')

const rootResolver = {

    ...authResolver,
    // ...eventsResolver,
    // ...bookingResolver
    ...courseResolver,
    ...subjectResolver,
    ...assignmentResolver,
    ...markResolver,
    ...studentResolver,
    ...lecturerResolver
}

module.exports = rootResolver