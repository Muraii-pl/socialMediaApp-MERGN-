const  { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')




const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}) => ({ req })
})

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,useUnifiedTopology:true}).then(() => {
    return server.listen({port: 5000})
})
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })