const Lecturer = require('../../models/lecturer');
const Subject = require('../../models/subject');
const Accept = require('../../models/accept');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');
const { subjects, user , singleSubject , singleLecturer } = require('./merge');

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
        return Subject.findById(args.subjectId)
            .then(subject => {
                if (!subject) {
                    throw new Error("Subject not available")
                }
                const accept = Accept({
                    lecturerId : args.lecturerId,
                    subjectId : args.subjectId,
                    accepted : false
                })
                return accept.save()
                .then(accept => {
                    return {...accept._doc , lecturerId : singleLecturer(accept.lecturerId) , subjectId : singleSubject(accept.subjectId)}
                })
            })
            .then(accept => {
                return accept;
            })
            .catch(err => {
                throw err;
            })
    },

    accepts: () => {
        return Accept.find({lecturerId: '5d036727169a524190dd938f' , accepted : false})
        .then(accepts => {
            return accepts.map((obj) =>{ 
                return {...obj._doc , lecturerId : singleLecturer(obj.lecturerId) , subjectId : singleSubject(obj.subjectId)}
            })
        })
        .catch(err => {
            throw err
        })
    },

    lecturerAccepted: (args) => {
        let assignLecturer
        let acceptSearched
        return Accept.findById(args.acceptId)
            .then(accept => {
                if (!accept) {
                    throw new Error("Accept not available")
                }
                acceptSearched = accept
                return Lecturer.findById(accept.lecturerId)
                    .then(lecturer => {
                        lecturer.lecturerSubjects.push(accept.subjectId);
                        return lecturer.save();
                    })
            })
            .then(lecturer => {
                assignLecturer = {...lecturer._doc, userId: user(lecturer._doc.userId), lecturerSubjects: subjects(lecturer._doc.lecturerSubjects) }
                    return Accept.findById(args.acceptId)
                    .then(accept => {
                        accept.accepted = true
                        return accept.save()
                    })
                    .then(accept => {
                        return Subject.findById(accept.subjectId)
                        .then(subject => {
                            subject.lectures.push(lecturer);
                            return subject.save();
                        })  
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