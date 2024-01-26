import { buildSchema } from "type-graphql"
import AppDataSource from "./ormconfig"
import { ApolloServer } from "apollo-server"
import { NoteResolver } from "./resolvers/NoteResolver"
import { UserResolver } from "./resolvers/UserResolver"

const main = async () => {
    AppDataSource.initialize()
        .then(() => console.log("Database connected"))
        .catch((err: Error) => console.error(err))

    const schema = await buildSchema({ 
        resolvers: [NoteResolver, UserResolver],
        validate: true 
    })
    const server = new ApolloServer({ 
        schema
    })

    await server.listen(4000)
                .then(() => console.log("Server started on http://localhost:4000/graphql"))
                .catch((err: Error) => console.error(err))
}

main()
    .catch((err: Error) => console.error(err))