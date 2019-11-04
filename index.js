const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  books: [Book]
  authors: [Author!]!
  # printables: [Printable]!
  sellable: [Sellable]!
}

type Mutation {
  addBook(book: AddBookInput): Book
  addAuthor(
    name: String!
    id: String!
    bookIds: String!
  ): String
}

enum PhotoSizes {
  LARGE
  MEDIUM
  SMALL
}

input AddBookInput {
  name: String!
  releaseDate: Int!
  photo: String
  authorId: String!
}

type Book implements Sellable {
  id: String!
  name: String!
  releaseDate: Int!
  author: Author!
  photo: String
  price: Float
}

type Magazine implements Sellable {
  id: String!
  name: String!
  releaseDate: Int!
  publisher: String
  photo: String
  price: Float
}

type Sticker implements Sellable {
  id: String!
  photo: String!
  price: Float
}

interface Sellable {
  id: String!
  photo: String
  price: Float
}

# union Printable = Book | Magazine

type Author {
  id: String!
  name: String!
  books: [Book]!
}
`
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  mocks: true,
  mockEntireSchema: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
