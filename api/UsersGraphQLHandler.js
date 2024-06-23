var { buildSchema } = require("graphql")
var { createHandler } = require("graphql-http/lib/use/express")

function getUsersRedisCacheKey(userName) {
  return `WebAppServer/users:${userName}`
}

var schema = buildSchema(`
  type Query {
    dummy: ID
  }

  type Mutation {
    login(userName: String!): User!
    updateFavoriteCharacters(userName: String!, newFavoriteCharacters: [String!]!): User!
  }

  type User {
    userName: String!
    userSettings: UserSettings!
  }

  type UserSettings {
    favoriteCharacters: [String!]!
  }
`)

const createNewUser = (userName) => ({
  userName,
  userSettings: {
    favoriteCharacters: [],
  },
})

const updateUserFavoriteCharacters = (user, newFavoriteCharacters) => ({
  ...user,
  userSettings: {
    ...user.userSettings,
    favoriteCharacters: newFavoriteCharacters,
  },
})

const createRootValue = (redisClient) => ({
  async login({ userName }) {
    const redisCacheKey = getUsersRedisCacheKey(userName)
    const existingUser = await redisClient.get(redisCacheKey)
      .then(u => JSON.parse(u));

    if (existingUser) {
      console.debug(`User was found: ${existingUser.userName}`);

      return existingUser;
    } else {
      console.debug(`User wasn't found: ${userName}`);

      const newUser = createNewUser(userName);

      await redisClient.set(
        redisCacheKey,
        JSON.stringify(newUser),
      )

      return newUser;
    }
  },

  async updateFavoriteCharacters({ userName, newFavoriteCharacters }) {
    const redisCacheKey = getUsersRedisCacheKey(userName)
    const user = await redisClient.get(redisCacheKey)
      .then(u => JSON.parse(u));

    const updatedUser = updateUserFavoriteCharacters(user, newFavoriteCharacters);

    await redisClient.set(
      redisCacheKey,
      JSON.stringify(updatedUser),
    )

    return updatedUser;
  },
})

const UsersGraphQLHandler = (redisClient) => {
  const handler = createHandler({
    schema,
    rootValue: createRootValue(redisClient),
  });

  return handler;
}

module.exports.UsersGraphQLHandler = UsersGraphQLHandler;
