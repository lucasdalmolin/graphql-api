const graphql = require('graphql');
let _ = require('lodash');
const User = require("../../model/user");
const Hobby = require("../../model/hobby");
const Post = require("../../model/post");

    // let usersData = [
    //     {id: '1', name: 'Bond', age: 36, profession: 'Pintor'},
    //     {id: '2', name: 'Anna', age: 16, profession: 'Pintor'},
    //     {id: '3', name: 'Bella', age: 26, profession: 'Pintor'},
    //     {id: '4', name: 'Gina', age: 32, profession: 'Pintor'},
    //     {id: '5', name: 'Georgina', age: 24, profession: 'Pintor' },
    // ];

    // let hobbiesData = [
    //     {id: '1', title: 'Prasd',  description: 'Pintoa r'},
    //     {id: '2', title: 'Annadds',  description: 'Pintodar'},
    //     {id: '3', title: 'Bedas',  description: 'Pintorww'},
    //     {id: '4', title: 'bbasd',  description: 'Pintodasdr'},
    //     {id: '5', title: 'YYeasd',  description: 'dasdasdasda' },
    // ];

    // let postsData = [
    //     {id: '1', comment: 'Prasd', userId: '1'},
    //     {id: '2', comment: 'Annadds', userId: '2'},
    //     {id: '3', comment: 'Bedas', userId: '3'},
    //     {id: '4', comment: 'Beddddddas', userId: '1'},
    // ];

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql

//Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postsData, {userId: parent.id}); 
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, {userId: parent.id})
            }
        }
    })

});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post description',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }
    })

});

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args) {
                return _.find(usersData, {id: args.id})
                //we resolve with data
                //get and return from a datasource
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return hobbiesData;
            }
        },
        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                return _.find(hobbiesData, {id: args.id})
            }
        },
        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                return _.find(postsData, {id: args.id})
            }
        }
    }
});

//Mutations
const Mutation = new GraphQLObjectType ({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLNonNull(GraphQLInt)},
                profession: {type: GraphQLString}
            },

            resolve(parent, args) {
                let user = User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                })

                return user.save();
            }
        },
        //Update User
        UpdateUser: {
            type: UserType,
            args: {
                id: {type: GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLNonNull(GraphQLInt)},
                profession: {type: GraphQLString}
            },
            resolve(parent, args) {
                return updateUser = User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            age: args.age,
                            profession: args.profession
                        }
                    },
                    {new: true}
                )
            }
        },
        //RemoveUser
        RemoveUser: {
            type: UserType,
            args: {
                id: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let removedUser = User.findByIdAndRemove(args.id).exec()
                if (!removeUser) {
                    throw new "Error"()
                }
            }
        },
        //Update post
        UpdatePost: {
             type: PostType,
             args: {
                id,
                comment: {type: GraphQLNonNull(GraphQLString)},
             },
             resolve(parent, args) {
                return (updatedPost = Post.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            comment: args.comment
                        }
                    }, {new: true}
                ))
             }
        },
        createPost: {
            type: PostType,
            args: {
                // id: {type: GraphQLNonNull(GraphQLID)},
                comment: {type: GraphQLNonNull(GraphQLString)},
                userId: {type: GraphQLNonNull(GraphQLID)}
            },

            resolve(parent, args) {
                let post = Post({
                    comment: args.comment,
                    userId: args.userId
                })

                return post.save() ;
            }
        },
        //Remove Post
        RemovePost: {
            type: PostType,
            args: {
                id: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let removedPost = Post.findByIdAndRemove(args.id).exec()

                if(!removedPost) {
                    throw new "Error"()
                }

                return removedPost
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                // id: {type: GraphQLID},
                title: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                userId: {type: GraphQLNonNull(GraphQLID)}
            },

            resolve(parent, args) {
                let hobby = Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                })

                return hobby.save() ;
            }
        },
        UpdateHobby: {
            type: HobbyType,
            args: {
                id: {type: GraphQLNonNull(GraphQLString)},
                title: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                return(updateHobby = Hobby.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            title: args.title,
                            description: args.description
                        }
                    },
                    {new: true}
                ))
            }
        },
        RemoveHobby: {
            type: HobbyType,
            args: {
                id: {type: GraphQLNonNull(GraphQLString)},

            },
            resolve(parent, args) {
                let removedHobby = Hobby.findByIdAndRemove(args.id).exec()
                if(!removedHobby) {
                    throw new "Error"()
                }
                return removedHobby
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})