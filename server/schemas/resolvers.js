const { Book, User } = require('../models');
const { signToken } = require ('../utils/auth.js');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user){
        console.log(context.user)
        const user = await User.findOne({_id:context.user._id});
        return user
      }
      throw new Error("User isn't logged in")
    },
    // matchups: async (parent, { _id }) => {
    //   const params = _id ? { _id } : {};
    //   return Matchup.find(params);
    // },
  },
  Mutation: {
    addUser: async (parent, args, context) => {
      const user = User.create(args)
      const token = signToken(user)
      return {user, token}
    },
    login: async (parent, args, context) => {
      const user = await User.findOne ({email:args.email})
      if (!user){
        throw new Error("Invalid credentials")
      }
      const password = await user.isCorrectPassword (args.password)
      if (!password){
        throw new Error("Invalid password")
      }
      const token = signToken(user)
      return {user, token}
    },
    saveBook: async (parent, args, context) => {

    }
  
    
    // createMatchup: async (parent, args) => {
    //   const matchup = await Matchup.create(args);
    //   return matchup;
    // },
    // createVote: async (parent, { _id, techNum }) => {
    //   const vote = await Matchup.findOneAndUpdate(
    //     { _id },
    //     { $inc: { [`tech${techNum}_votes`]: 1 } },
    //     { new: true }
    //   );
    //   return vote;
    // },
  },
};

module.exports = resolvers;
