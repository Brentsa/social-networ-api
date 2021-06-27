const {Thought, User} = require('../models');

const thoughtController = {
    //Get all thoughts
    getAllThoughts(req, res){
        Thought.find({}).select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(error => res.status(500).json(error));
    },

    //Get a single thought by id
    getSingleThought({params}, res){
        Thought.findById(params.id).select('-__v')
        .then(dbThoughtData => !dbThoughtData ? res.status(404).json({message: "Thought with this id not found."}) : res.json(dbThoughtData))
        .catch(error => res.status(500).json(error));
    },

    //Create a new thought
    createThought({body}, res){
        User.find({username: body.username})
        .then(dbUserData => {
            if(!dbUserData){
                return res.status(404).json({message: "User not found."})
            }
            Thought.create(body)
            .then(dbThoughtData => {
                //push the thought id into the dbUserData thoughts array
                dbUserData[0].thoughts.push(dbThoughtData._id);
                //save the new id into the user info and return the new user and thought data
                dbUserData[0].save().then(() => res.json({user:dbUserData, thought:dbThoughtData}));
            })
        })
        .catch(error => res.status(500).json(error));
    },

    //Update a thought by id
    updateThought({params, body}, res){
        Thought.findByIdAndUpdate(params.id, body, {new: true, runValidators: true})
        .then(dbThoughtData => !dbThoughtData ? res.status(404).json({message: "Thought with this id not found."}) : res.json(dbThoughtData))
        .catch(error => res.status(500).json(error));
    },

    //Delete a thought by id
    deleteThought({params}, res){
        Thought.findByIdAndDelete(params.id)
        .then(dbThoughtData => !dbThoughtData ? res.status(404).json({message: "Thought with this id not found."}) : res.json(dbThoughtData))
        .catch(error => res.status(500).json(error));
    },

    //Add a reaction to the reaction array in the thought document
    addReaction({params, body}, res){
        Thought.findByIdAndUpdate(
            params.thoughtId,
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => !dbThoughtData ? res.status(404).json({message: "Thought with this id not found."}) : res.json(dbThoughtData))
        .catch(error => res.status(500).json(error));
    },

    //Delete a reaction from the thought document
    deleteReaction({params}, res){
        Thought.findByIdAndUpdate(
            params.thoughtId,
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => !dbThoughtData ? res.status(404).json({message: "Thought with this id not found."}) : res.json(dbThoughtData))
        .catch(error => res.status(500).json(error));
    }
}

module.exports = thoughtController;