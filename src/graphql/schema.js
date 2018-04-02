import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = [`
    scalar Date

    type ApplicationType {
        _id: String
        name: String
        description: String
        active: Boolean
        applications: [Application]
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Application {
        _id: String
        name: String
        description: String
        clientId: String
        clientSecret: String
        version: String
        iosId: String
        androidId: String
        applicationType: ApplicationType
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type User {
        _id: String
        name: String
        lastName: String
        userName: String
        email: String
        birthDate: Date
        emailConfirmed: Boolean
        emailConfirmationToken: String
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Query {
        applicationTypes(searchTerm: String): [ApplicationType]
        applicationType(id: String!): ApplicationType

        applications(searchTerm: String): [Application]
        application(id: String!): Application

        users: [User]
        user(id: String!): User
        userByEmailConfirmationToken(token: String!): User
    }

    type Mutation {
        addApplicationType(name: String!, description: String): ApplicationType
        editApplicationType(id: String!, name: String!, description: String, active: Boolean): ApplicationType
        deleteLogicApplicationType(id: String!): ApplicationType
        deleteApplicationType(id: String!): ApplicationType

        addApplication(name: String!, description: String, clientId: String!, clientSecret: String!, version: String, iosId: String, androidId: String, applicationType: String! ): Application
        editApplication(id: String!, name: String!, description: String, clientId: String!, clientSecret: String!, version: String, iosId: String, androidId: String, applicationType: String!, active: Boolean): Application
        deleteLogicApplication(id: String!): Application
        deleteApplication(id: String!): Application

        addUser(name: String!, lastName: String!, userName: String!, email: String!, password: String!, birthDate: Date): User
        editUser(id: String, name: String!, lastName: String!, userName: String!, email: String!, birthDate: Date): User
        deleteLogicUser(id: String!): User
        deleteUser(id: String!): User
        userConfirmEmail(id: String!): User
        userChangePassword(id: String!, passwordCurrent: String!, newPassword: String!, confirmPassword: String!): User
    }
`];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;