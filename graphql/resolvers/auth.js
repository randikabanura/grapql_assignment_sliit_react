const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user')
const Student = require('../../models/student')
const Lecturer = require('../../models/lecturer')

module.exports = {
    createUser: (args) => {
        let createdUser
        return User.findOne({ email: args.userInput.email })
            .then(user => {
                if (user) {
                    throw new Error("User exist already")
                }
                return bcrypt.hash(args.userInput.password, 12)
            })
            .then(hasedPassword => {
                const user = User({
                    email: args.userInput.email,
                    password: hasedPassword,
                    userRole: args.userInput.userRole,
                })

                return user.save()
                    .then(result => {
                        return {...result._doc, password: null }
                    })
            })
            .then(user => {
                if (args.userInput.userRole === 'student') {
                    const student = Student({
                        email: args.userInput.email,
                        name: args.userInput.name,
                        idNumber: args.userInput.idNumber,
                        userId: user._id
                    })
                    return student.save()
                        .then(result => {
                            return {...result._doc }
                        }).then(result => {
                            return User.findOneAndUpdate({ email: args.userInput.email }, { details: result._id })
                        })
                } else if (args.userInput.userRole === 'lecturer') {
                    const lecturer = Lecturer({
                        email: args.userInput.email,
                        name: args.userInput.name,
                        idNumber: args.userInput.idNumber,
                        userId: user._id
                    })
                    return lecturer.save()
                        .then(result => {
                            return {...result._doc }
                        }).then(result => {
                            return User.findOneAndUpdate({ email: args.userInput.email }, { details: result._id })
                        })
                } else
                    return User.findOne({ email: args.userInput.email })

            }).catch(err => {
                throw err
            });
    },

    login: ({ email, password }) => {
        let userToken;
        return User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    throw new Error("User does not exists")
                }
                userToken = user
                return bcrypt.compare(password, user.password)
            })
            .then(isEqual => {
                if (!isEqual) {
                    throw new Error("Password is incorrect")
                }
                const token = jwt.sign({ userId: userToken.id, email: userToken.email, userRole: userToken.userRole }, 'somesupersecretkey', {
                    expiresIn: '1h'
                });
                return { userId: userToken.id, userRole: userToken.userRole, token: token, tokenExpiration: 1 }
            })
    }
}