const { dateToString } = require('../../helpers/date');
const { user, singleEvent } = require('./merge');

module.exports = {

    booking: () => {
        return Booking.find()
            .then(result => {
                return result.map((obj) => {
                    return {...obj._doc, updatedAt: dateToString(obj._doc.updatedAt), createdAt: dateToString(obj._doc.createdAt), event: singleEvent.bind(this, obj._doc.event), user: user.bind(this, obj._doc.user) }
                })
            })
            .catch(err => {
                throw err
            })
    },
    bookEvent: (args, req) => {
        if (!req.isAuth) {
            throw new Error("User not authenticated")
        }
        return Event.findOne({ _id: args.eventId })
            .then(result => {
                const booking = Booking({
                    user: req.userId,
                    event: result
                })
                return booking.save()
            }).then(result => {
                return {...result._doc, updatedAt: dateToString(obj._doc.updatedAt), createdAt: dateToString(obj._doc.createdAt), event: singleEvent.bind(this, result._doc.event), user: user.bind(this, result._doc.user) }
            })
            .catch(err => {
                throw err
            })
    },

    cancalBooking: (args, req) => {
        if (!req.isAuth) {
            throw new Error("User not authenticated")
        }
        return Booking.findByIdAndRemove(args.bookingId)
            .then(result => {
                return {...result._doc, event: singleEvent.bind(this, result._doc.event), user: user.bind(this, result._doc.user) }
            })
            .catch(err => {
                throw err
            })
    }

}