const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat
} = graphql

//Scalar type
/*
    String
    int
    Float
    Boolean ID
*/

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Represents  a persona type',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat},

        justAType: {
            type: Person,
            resolve(parent, args) {
                return parent;
            }
        }
    })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        person: {
            type: Person,
            resolve(parent, args) {
                let personaObj = {
                    name: "Lucas",
                    age:27,
                    isMarried: false,
                    gpa: 4.1
                }
                return personaObj; 
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})