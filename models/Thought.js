//Import Schema class and model function from mongoose
const {Schema, model, Types} = require('mongoose');

//Define a reaction schema
const reactionSchema = new Schema(
    {
        //reaction custom id that is an ObjectId type
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        //reaction body that contains text up to a maximum of 280 characters
        reactionBody: {
            type: String,
            required: 'Reaction text is required.',
            maxLength: 280,
            trim: true
        },
        //user who created the reaction
        username: {
            type: String,
            required: 'Username is required.'
        },
        //created at date that has a default value of current time and a getter method to format the timestamp
        createdAt: {
            type: Date,
            default: Date.now
            //implement get
        }
    },
    {
        toJson: {getters: true}
    }
);

//Define the thought schema 
const thoughtSchema = new Schema(
    {
        //thought text that must be a string, has to be required and be between 1 and 280 characters
        thoughtText:{
            type: String,
            required: 'Thought text is required',
            maxLength: 280,
            trim: true
        },
        //created at date that has a default value of current time and a getter method to format the timestamp
        createdAt: {
            type: Date,
            default: Date.now,
            //implement get

        },
        //user that created this though, this is a required string
        username: {
            type: String,
            required: 'Username is required.'
        },
        //reactions is an array of nested reactions
        reactions: [reactionSchema]
    },
    {
        toJSON: {virtuals: true, getters: true},
        id: false
    }
);

//Implement a reaction count virtual
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

//compile the thought model with the schema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;