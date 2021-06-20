//Import model and types from Mongoose library
const {Schema, model} = require('mongoose');

//User schema instantiation
const UserSchema = new Schema(
    {
        //username of type string, has to be required, unique, and trimmed
        username: {
            type: String,
            required: 'Username is required.',
            unique: true,
            trim: true
        },
        //email of type string, must be required, unique, validated as an email using match
        email: {
            type: String,
            required: 'Email address is required',
            unique: true,
            trim: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid email address.']
        },
        //thoughts array, containing an _id referencing the Thoughts model
        thoughts: [],
        //friends array, containing an _id referencing the user model as a self reference
        friends: [UserSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

//Implement a friend count virtual on UserSchema
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

//Define the User model based on UserSchema
const User = model('User', UserSchema);

//Export the model
module.exports = User;
