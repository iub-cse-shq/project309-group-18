var mongoose = require('mongoose')
const valid = require('validator')
const ProfilesSchema = new mongoose.Schema({
    type: String,
    userName: { type: String, required: true },
    email:{
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return valid.isEmail(v)
            },
            message: `{VALUE} is not an Email`
        }
    },
    password: String,
    age: Number,
    contact: String,
    gender: String,
    eduStatus: String
})
var Profile = mongoose.model('Profiles',ProfilesSchema)
module.exports = Profile